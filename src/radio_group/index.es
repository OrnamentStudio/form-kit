import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connect from '../form_connect';
import { getValue } from '../form/utils';


class RadioGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.renderOption = this.renderOption.bind(this);
  }

  handleChange(value) {
    const { form, field } = this.props;
    form.updateField(field, value);
  }

  renderOption({ value, content }) {
    const {
      form,
      field,
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
          checked={value === getValue(form, field)}
          name={field}
          onChange={this.handleChange.bind(this, value)}
        />
        <span className={contentClassName}>
          {content}
        </span>
      </span>
    );
  }

  render() {
    const { options } = this.props;
    return options.map(this.renderOption);
  }
}

RadioGroup.defaultProps = {
  options: [],
};

RadioGroup.propTypes = {
  options: PropTypes.array.isRequired,

  form: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,

  itemClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

export default connect(RadioGroup);
