import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import wrapControl from '../control_wrapper';


class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { control } = this.props;
    const { checked } = event.target;
    control.update(checked);
  }

  render() {
    const { control, ...cleanProps } = this.props;
    const { field, value } = control;

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
  control: PropTypes.object.isRequired,
};

export default wrapControl(Checkbox);
