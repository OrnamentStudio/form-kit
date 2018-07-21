import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';
import { getValue } from '../form/utils';


class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { form, field } = this.props;
    const { checked } = event.target;
    form.updateField(field, checked);
  }

  render() {
    const { form, field, ...cleanProps } = this.props;
    const value = getValue(form, field, false);

    return (
      <input
        {...cleanProps}
        type="checkbox"
        checked={value}
        name={field}
        onChange={this.handleChange}
      />
    );
  }
}

Checkbox.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};

export default connect(Checkbox);
