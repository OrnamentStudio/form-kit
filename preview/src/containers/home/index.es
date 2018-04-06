import React, { PureComponent, Fragment } from 'react';
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

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { customErrors: null };
    this.setCustomErrors = this.setCustomErrors.bind(this);
  }

  setCustomErrors() {
    this.setState({
      customErrors: {
        firstname: 'Custom Error Message',
      },
    });
  }

  render() {
    const { customErrors } = this.state;

    return (
      <article>
        <h1>Ornament Form Kit</h1>
        <section>
          <h2>Empty Form</h2>
          <Form>
            <Text field="firstname" />
          </Form>
        </section>
        <section>
          <h2>Prefilled Data</h2>
          <Form defaultModel={defaultModel}>
            <Text field="firstname" />
          </Form>
        </section>
        <section>
          <h2>Form with validation</h2>
          <Form
            defaultModel={defaultModel}
            validation={validation}
            errors={customErrors}
            onSubmit={handleSubmit}
            onValidSubmit={handleValidSubmit}
            onInvalidSubmit={handleInvalidSubmit}
          >
            {({ errors }) => (
              <Fragment>
                <Text field="firstname" />
                {errors.firstname ? <strong>{errors.firstname}</strong> : null}
                <div>
                  <button type="button" onClick={this.setCustomErrors}>Set Custom errors</button>
                </div>
              </Fragment>
            )}
          </Form>
        </section>
      </article>
    );
  }
}

export default Home;
