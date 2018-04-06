/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from '../form_context';
import { getErrors, hasErrors, invoke } from './utils';


class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      updateField: this.updateField.bind(this),
      model: props.defaultModel,
      errors: {},
    };
  }

  updateField(field, value) {
    const model = { ...this.state.model, [field]: value };
    this.setState({ model });
  }

  handleSubmit(event) {
    event.preventDefault();

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
      defaultModel,
      validation,

      onSubmit,
      onValidSubmit,
      onInvalidSubmit,

      ...cleanProps
    } = this.props;

    return (
      <form {...cleanProps} onSubmit={this.handleSubmit}>
        <Provider value={this.state}>{children(this.state)}</Provider>
      </form>
    );
  }
}

Form.defaultProps = {
  defaultModel: {},
  validation: {},
};

Form.propTypes = {
  children: PropTypes.func.isRequired,
  defaultModel: PropTypes.object.isRequired,
  validation: PropTypes.object.isRequired,

  onSubmit: PropTypes.func,
  onValidSubmit: PropTypes.func,
  onInvalidSubmit: PropTypes.func,
};

export default Form;
