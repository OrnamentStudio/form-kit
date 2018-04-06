import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';


const DEFAULT_VALUE = '';

const isStateChanged = (nextProps, prevState) => (
  nextProps.form !== prevState.form ||
  nextProps.value !== prevState.value ||
  nextProps.field !== prevState.field
);

export default (Component) => {
  class Control extends PureComponent {
    static getDerivedStateFromProps(nextProps, prevState) {
      if (!isStateChanged(nextProps, prevState)) return null;

      const { form, field } = nextProps;
      const value = form.model[field] || DEFAULT_VALUE;
      const update = (newValue) => form.updateField(nextProps.field, newValue);

      return { form, field, value, update };
    }

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { field, form, ...cleanProps } = this.props;
      return <Component {...cleanProps} control={this.state} />;
    }
  }

  Control.propTypes = {
    field: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
  };

  return connect(Control);
};
