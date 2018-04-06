import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import wrapControl from '../control_wrapper';


const renderOption = ({ value, content }) => (
  <option key={value} value={value}>{content}</option>
);

class Select extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { control } = this.props;
    const { value } = event.target;
    control.update(value);
  }

  render() {
    const { control, options, ...cleanProps } = this.props;
    const { field, value } = control;

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
  control: PropTypes.object.isRequired,
};

export default wrapControl(Select);
