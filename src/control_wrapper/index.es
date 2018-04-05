import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withForm from '../with_form';


export default (Component) => {
  class Control extends PureComponent {
    constructor(props) {
      super(props);
      this.connectForm(props);

      this.state = { value: props.defaultValue || '' };
      this.setValue = this.setValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.form !== this.props.form) {
        this.disconnectForm(this.props);
        this.connectForm(nextProps);
      }
    }

    componentWillUnmount() {
      this.disconnectForm(this.props);
    }

    getName() { return this.props.name; }
    getValue() { return this.state.value; }
    setValue(value) { this.setState({ value }); }

    connectForm(props) { if (props.form && props.name) props.form.addControl(this); }
    disconnectForm(props) { if (props.form && props.name) props.form.removeControl(this); }

    render() {
      const { defaultValue, validate, name, ...cleanProps } = this.props;
      const { value } = this.state;

      const control = {
        name,
        value,
        setValue: this.setValue,
      };

      return <Component {...cleanProps} control={control} />;
    }
  }

  Control.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.any,

    form: PropTypes.shape({
      addControl: PropTypes.func.isRequired,
      removeControl: PropTypes.func.isRequired,
    }),

    validate: PropTypes.arrayOf(
      PropTypes.shape({
        validator: PropTypes.func.isRequired,
        message: PropTypes.string.isRequired,
      }),
    ),
  };

  return withForm(Control);
};
