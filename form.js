const React = require('react');
const PropTypes = require('prop-types');
const memoize = require('memoize-one/dist/memoize-one.cjs');
const debounce = require('lodash/debounce');

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

    this.validate = this.validate.bind(this);
    this.debouncedValidate = debounce(this.validate, props.validationRate);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.debouncedValidate.close) this.debouncedValidate.close();
  }

  getAPI(model, errors, locked) {
    return {
      locked,
      model,
      errors,
      updateField: this.updateField,
      validate: this.validate,
    };
  }

  setErrors(errors) {
    this.setState({ errors });
  }

  updateField(field, value, options = {}) {
    const { locked, validateOnUpdate } = this.props;
    if (locked) return;

    let callback;
    if (validateOnUpdate && !options.silent) {
      callback = this.debouncedValidate;
    }

    const update = ({ model }) => ({
      model: { ...model, [field]: value },
    });

    this.setState(update, callback);
  }

  validate() {
    const { model } = this.state;
    const { validation } = this.props;

    const errors = getErrors(model, validation);
    this.setErrors(errors);

    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      locked,
      onSubmit,
      onValidSubmit,
      onInvalidSubmit,
    } = this.props;


    if (locked) return;

    const { model } = this.state;
    const errors = this.validate();

    onSubmit(event);
    if (hasErrors(errors)) onInvalidSubmit();
    else onValidSubmit(model);
  }

  render() {
    const {
      children,

      locked,
      defaultModel,

      validateOnUpdate,
      validationRate,
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

  validateOnUpdate: false,
  validationRate: 200,
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

  validateOnUpdate: PropTypes.bool,
  validationRate: PropTypes.number,
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
