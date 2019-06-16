const React = require('react');
const PropTypes = require('prop-types');
const connect = require('./connect');
const { getValue, getPropTypeForm } = require('./utils');

const { PureComponent, createElement: e } = React;


const renderOption = ({ value, content }) => e('option', { key: value, value }, content);

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
    const {
      form,
      field,
      options,
      ...rest
    } = this.props;

    const value = getValue(form, field);
    const content = options.map(renderOption);

    const props = {
      ...rest,
      value,
      name: field,
      onChange: this.handleChange,
    };

    return e('select', props, content);
  }
}

Select.defaultProps = {
  options: [],
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      content: PropTypes.any,
    }),
  ),

  form: getPropTypeForm().isRequired,
  field: PropTypes.string.isRequired,
};

module.exports = connect(Select);
