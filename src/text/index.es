import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';
import { getValue } from '../form/utils';


const TYPES = [
  'text',
  'password',
  'date',
  'datetime-local',
  'email',
  'month',
  'number',
  'search',
  'tel',
  'time',
  'url',
  'week',
];

class Text extends PureComponent {
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
    const { form, field, type, ...cleanProps } = this.props;
    const value = getValue(form, field);

    return (
      <input
        {...cleanProps}
        type={type}
        value={value}
        name={field}
        onChange={this.handleChange}
      />
    );
  }
}

Text.defaultProps = {
  type: 'text',
};

Text.propTypes = {
  type: PropTypes.oneOf(TYPES).isRequired,
  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};

export default connect(Text);
