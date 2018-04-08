import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import wrapControl from '../control_wrapper';


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
    const { control } = this.props;
    const { value } = event.target;
    control.update(value);
  }

  render() {
    const { control, type, ...cleanProps } = this.props;
    const { field, value } = control;

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
  control: PropTypes.object.isRequired,
};

export default wrapControl(Text);