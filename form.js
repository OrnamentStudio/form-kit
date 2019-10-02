const React = require('react');
const PropTypes = require('prop-types');
const memoize = require('memoize-one/dist/memoize-one.cjs');
const { Provider } = require('./context');
const { getErrors, hasErrors, noop } = require('./utils');

const { PureComponent, createElement: e } = React;


class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      model: { ...props.defaultModel },
      errors: {},
    };

    this.getAPI = memoize(this.getAPI);
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAPI(model, errors, locked) {
    return {
      locked,
      model,
      errors,
      updateField: this.updateField,
    };
  }

  setErrors(errors) {
    this.setState({ errors });
  }

  updateField(field, value) {
    const { locked } = this.props;
    if (locked) return;

    const update = ({ model }) => ({ model: { ...model, [field]: value } });
    this.setState(update);
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      locked,
      validation,
      onSubmit,
      onValidSubmit,
      onInvalidSubmit,
    } = this.props;

    if (locked) return;

    const { model } = this.state;
    const errors = getErrors(model, validation);

    this.setErrors(errors);

    onSubmit(event);
    if (hasErrors(errors)) onInvalidSubmit();
    else onValidSubmit(model);
  }

  render() {
    const {
      children,

      locked,
      defaultModel,
      validation,

      onSubmit,
      onValidSubmit,
      onInvalidSubmit,

      ...rest
    } = this.props;

    const {
      model,
      errors,
    } = this.state;

    const api = this.getAPI(model, errors, locked);
    const content = typeof children === 'function' ? children(api) : children;

    const provider = e(Provider, { value: api }, content);
    return e('form', { ...rest, onSubmit: this.handleSubmit }, provider);
  }
}

Form.defaultProps = {
  children: null,

  locked: false,
  defaultModel: {},
  validation: {},

  onSubmit: noop,
  onValidSubmit: noop,
  onInvalidSubmit: noop,
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),

  locked: PropTypes.bool,
  defaultModel: PropTypes.objectOf(
    PropTypes.any,
  ),

  validation: PropTypes.objectOf(
    PropTypes.shape({
      required: PropTypes.bool,
      validate: PropTypes.arrayOf(PropTypes.func),
      message: PropTypes.string.isRequired,
    }),
  ),

  onSubmit: PropTypes.func,
  onValidSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
};

module.exports = Form;
