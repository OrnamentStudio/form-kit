import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import wrapControl from '../control_wrapper';


class RadioGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.renderOption = this.renderOption.bind(this);
  }

  handleChange(value) {
    const { control } = this.props;
    control.update(value);
  }

  renderOption({ value, content }) {
    const {
      control,
      options,

      itemClassName,
      contentClassName,

      ...cleanProps
    } = this.props;

    return (
      <span key={value} className={itemClassName}>
        <input
          {...cleanProps}
          type="radio"
          checked={value === control.value}
          name={control.field}
          onChange={this.handleChange.bind(this, value)}
        />
        <span className={contentClassName}>{content}</span>
      </span>
    );
  }

  render() {
    const { options } = this.props;
    const content = options.map(this.renderOption);

    return <Fragment>{content}</Fragment>;
  }
}

RadioGroup.defaultProps = {
  options: [],
};

RadioGroup.propTypes = {
  options: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired,

  itemClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default wrapControl(RadioGroup);
