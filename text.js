const React = require('react');
const PropTypes = require('prop-types');
const connect = require('./connect');
const { getValue, getPropTypeForm } = require('./utils');

const { PureComponent, createElement: e } = React;


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
    const { form, field } = this.props;
    const { value } = event.target;
    form.updateField(field, value);
  }

  render() {
    const {
      form,
      field,
      type,
      ...rest
    } = this.props;

    const value = getValue(form, field);

    const props = {
      ...rest,
      type,
      value,
      name: field,
      onChange: this.handleChange,
    };

    return e('input', props);
  }
}

Text.defaultProps = {
  type: 'text',
};

Text.propTypes = {
  type: PropTypes.oneOf(TYPES),
  form: getPropTypeForm().isRequired,
  field: PropTypes.string.isRequired,
};

module.exports = connect(Text);
