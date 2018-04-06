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
    control.update(value);
  }

  render() {
    const { control, ...cleanProps } = this.props;
    const { field, value } = control;

    return (
      <input
        {...cleanProps}
        type="text"
        value={value}
        name={field}
        onChange={this.handleChange}
      />
    );
  }
}

Text.propTypes = {
  control: PropTypes.object.isRequired,
};

export default wrapControl(Text);
