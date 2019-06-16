const React = require('react');
const connect = require('./connect');
const { getPropTypeForm } = require('./utils');

const { createElement: e } = React;


const Submit = (props) => {
  const { form, ...rest } = props;
  const { locked } = form;

  const buttonProps = {
    ...rest,
    disabled: locked,
    type: 'submit',
  };

  return e('button', buttonProps);
};

Submit.propTypes = {
  form: getPropTypeForm().isRequired,
};

module.exports = connect(Submit);
