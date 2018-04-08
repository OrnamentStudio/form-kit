/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from '../form_context';
import { getErrors, hasErrors, invoke, shouldStateUpdate } from './utils';


class Form extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!shouldStateUpdate(nextProps, prevState)) return null;

    const update = { locked: nextProps.locked };
    if (nextProps.errors) update.errors = nextProps.errors;
    return update;
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      updateField: this.updateField.bind(this),
      locked: props.locked,
      model: props.defaultModel,
      errors: {},
    };
  }

  updateField(field, value) {
    if (this.state.locked) return;

    const model = { ...this.state.model, [field]: value };
    this.setState({ model });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.locked) return;

    const { validation, onSubmit, onValidSubmit, onInvalidSubmit } = this.props;
    const { model } = this.state;
    const errors = getErrors(model, validation);

    this.setState({ errors });

    invoke(onSubmit, event);
    if (hasErrors(errors)) invoke(onInvalidSubmit);
    else invoke(onValidSubmit, model);
  }

  render() {
    const {
      children,

      locked,
      defaultModel,
      errors,
      validation,

      onSubmit,
      onValidSubmit,
      onInvalidSubmit,

      ...cleanProps
    } = this.props;

    const content = typeof children === 'function' ? children(this.state) : children;

    return (
      <form {...cleanProps} onSubmit={this.handleSubmit}>
        <Provider value={this.state}>{content}</Provider>
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
  errors: PropTypes.object,
  validation: PropTypes.object.isRequired,

  onSubmit: PropTypes.func,
  onValidSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
};

export default Form;
