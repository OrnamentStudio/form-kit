import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { Provider } from '../form_context';
import { getErrors, hasErrors, invoke } from './utils';


class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      model: props.defaultModel,
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

    invoke(onSubmit, event);
    if (hasErrors(errors)) invoke(onInvalidSubmit);
    else invoke(onValidSubmit, model);
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

      ...cleanProps
    } = this.props;

    const {
      model,
      errors,
    } = this.state;

    const api = this.getAPI(model, errors, locked);
    const content = typeof children === 'function' ? children(api) : children;

    return (
      <form {...cleanProps} onSubmit={this.handleSubmit}>
        <Provider value={api}>
          {content}
        </Provider>
      </form>
    );
  }
}

Form.defaultProps = {
  locked: false,
  defaultModel: {},
  validation: {},
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),

  locked: PropTypes.bool.isRequired,
  defaultModel: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,

  onSubmit: PropTypes.func,
  onValidSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
};

export default Form;
