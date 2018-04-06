import React, { Fragment } from 'react';
import Form from '../../../../lib/form';
import Text from '../../../../lib/text';


const defaultModel = {
  firstname: 'Abylay',
};

const validation = {
  firstname: {
    required: true,
    validate: [(value) => value.length > 5],
    message: 'Wrong name format',
  },
};

const handleValidSubmit = (model) => console.warn('Submit Success!', model);
const handleInvalidSubmit = () => console.error('Submit Error!');
const handleSubmit = (event) => console.warn('Native Event', event);

const renderForm = ({ errors }) => (
  <Fragment>
    <Text field="firstname" />
    {errors.firstname ? <strong>{errors.firstname}</strong> : null}
  </Fragment>
);

const Home = () => (
  <article>
    <h1>Ornament Form Kit</h1>
    <section>
      <h2>Empty Form</h2>
      <Form>{renderForm}</Form>
    </section>
    <section>
      <h2>Prefilled Data</h2>
      <Form defaultModel={defaultModel}>{renderForm}</Form>
    </section>
    <section>
      <h2>Form with validation</h2>
      <Form
        defaultModel={defaultModel}
        validation={validation}
        onSubmit={handleSubmit}
        onValidSubmit={handleValidSubmit}
        onInvalidSubmit={handleInvalidSubmit}
      >
        {renderForm}
      </Form>
    </section>
  </article>
);

export default Home;
