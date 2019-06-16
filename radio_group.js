const React = require('react');
const PropTypes = require('prop-types');
const connect = require('./connect');
const { getValue, getPropTypeForm } = require('./utils');

const { PureComponent, createElement: e } = React;


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

      ...rest
    } = this.props;

    const inputProps = {
      ...rest,
      type: 'radio',
      checked: value === getValue(form, field),
      name: field,
      onChange: this.handleChange.bind(this, value),
    };

    const input = e('input', inputProps);
    const contentNode = e('span', { className: contentClassName }, content);

    return e('span', { key: value, className: itemClassName }, input, contentNode);
  }

  render() {
    const { options } = this.props;
    return options.map(this.renderOption);
  }
}

RadioGroup.defaultProps = {
  options: [],
  itemClassName: null,
  contentClassName: null,
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      content: PropTypes.any,
    }),
  ),

  form: getPropTypeForm().isRequired,
  field: PropTypes.string.isRequired,

  itemClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

module.exports = connect(RadioGroup);
