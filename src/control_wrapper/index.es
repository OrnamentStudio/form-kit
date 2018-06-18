import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import connect from '../form_connect';

const DEFAULT_VALUE = '';


export default (Component) => {
  class Control extends PureComponent {
    constructor(props) {
      super(props);
      this.getAPI = memoize(this.getAPI);
    }

    getAPI(form, field) {
      const value = form.model[field] || DEFAULT_VALUE;
      const error = form.errors[field];
      const update = (newValue) => form.updateField(field, newValue);

      return {
        form,
        field,

        value,
        error,
        update,
      };
    }

    render() {
      const { field, form, ...cleanProps } = this.props;
      const api = this.getAPI(form, field);

      return <Component {...cleanProps} control={api} />;
    }
  }

  Control.propTypes = {
    field: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
  };

  return connect(Control);
};
