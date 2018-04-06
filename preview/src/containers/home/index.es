import React, { Fragment } from 'react';
import Form from '../../../../lib/form';
import Text from '../../../../lib/text';


const defaultModel = {
  firstname: 'Abylay',
};

const renderForm = () => (
  <Fragment>
    <Text field="firstname" />
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
  </article>
);

export default Home;
