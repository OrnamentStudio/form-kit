/* eslint-disable react/no-unused-state */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from '../form_context';


class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.controls = [];
    this.state = {
      addControl: this.addControl.bind(this),
      removeControl: this.removeControl.bind(this),
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getModel() {
    const grap = (acc, control) => ({
      ...acc,
      [control.getName()]: control.getValue(),
    });

    return this.controls.reduce(grap, {});
  }

  addControl(instance) {
    if (this.controls.includes(instance)) return;
    this.controls.push(instance);
  }

  removeControl(instance) {
    this.controls = this.controls.filter((control) => control !== instance);
  }


  handleSubmit(event) {
    event.preventDefault();
    const model = this.getModel();
    console.warn('SUBMIT', model);
  }

  render() {
    const { children, ...cleanProps } = this.props;

    return (
      <form {...cleanProps} onSubmit={this.handleSubmit}>
        <Provider value={this.state}>{children}</Provider>
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
};

export default Form;
