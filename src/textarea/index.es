import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';
import { getValue } from '../form/utils';


class Textarea extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { form, field } = this.props;
    const { value } = event.target;
    form.updateField(field, value);
  }

  render() {
    const { form, field, ...cleanProps } = this.props;
    const value = getValue(form, field);

    return (
      <textarea
        {...cleanProps}
        value={value}
        name={field}
        onChange={this.handleChange}
      />
    );
  }
}

Textarea.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};

export default connect(Textarea);
