/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from '../form_context';


class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      updateField: this.updateField.bind(this),
      model: props.defaultModel,
    };
  }

  updateField(field, value) {
    const model = { ...this.state.model, [field]: value };
    this.setState({ model });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.warn(this.state.model);
  }

  render() {
    const { children, defaultModel, ...cleanProps } = this.props;

    return (
      <form {...cleanProps} onSubmit={this.handleSubmit}>
        <Provider value={this.state}>{children(this.state)}</Provider>
      </form>
    );
  }
}

Form.defaultProps = {
  defaultModel: {},
};

Form.propTypes = {
  children: PropTypes.func.isRequired,
  defaultModel: PropTypes.object.isRequired,
};

export default Form;
