import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';
import { getValue } from '../form/utils';


const renderOption = ({ value, content }) => (
  <option key={value} value={value}>
    {content}
  </option>
);

class Select extends PureComponent {
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
    const { form, field, options, ...cleanProps } = this.props;
    const value = getValue(form, field);

    const content = options.map(renderOption);

    return (
      <select
        {...cleanProps}
        value={value}
        name={field}
        onChange={this.handleChange}
      >
        {content}
      </select>
    );
  }
}

Select.defaultProps = {
  options: [],
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};

export default connect(Select);
