import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import wrapControl from '../control_wrapper';


class Text extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { control } = this.props;
    const { value } = event.target;

    control.setValue(value);
  }

  render() {
    const { control, ...cleanProps } = this.props;

    return (
      <input
        {...cleanProps}
        type="text"
        name={control.name}
        onChange={this.handleChange}
        value={control.value}
      />
    );
  }
}

Text.propTypes = {
  control: PropTypes.shape({
    value: PropTypes.any,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
};

export default wrapControl(Text);
