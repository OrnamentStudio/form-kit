const React = require('react');
const PropTypes = require('prop-types');
const connect = require('./connect');
const { getValue, getPropTypeForm } = require('./utils');

const { PureComponent, createElement: e } = React;


class Textarea extends PureComponent {
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
    const { form, field, ...rest } = this.props;
    const value = getValue(form, field);

    const props = {
      ...rest,
      value,
      name: field,
      onChange: this.handleChange,
    };

    return e('textarea', props);
  }
}

Textarea.propTypes = {
  form: getPropTypeForm().isRequired,
  field: PropTypes.string.isRequired,
};

module.exports = connect(Textarea);
