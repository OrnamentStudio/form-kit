const React = require('react');
const PropTypes = require('prop-types');
const connect = require('./connect');
const { getValue, getPropTypeForm } = require('./utils');

const { PureComponent, createElement: e } = React;


class Checkbox extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { form, field } = this.props;
    const { checked } = event.target;
    form.updateField(field, checked);
  }

  render() {
    const { form, field, ...rest } = this.props;
    const value = getValue(form, field, false);

    const props = {
      ...rest,
      type: 'checkbox',
      checked: value,
      name: field,
      onChange: this.handleChange,
    };

    return e('input', props);
  }
}

Checkbox.propTypes = {
  form: getPropTypeForm().isRequired,
  field: PropTypes.string.isRequired,
};

module.exports = connect(Checkbox);
