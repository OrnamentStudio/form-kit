import React, { PureComponent, Fragment } from 'react';
import Form from '../../../../lib/form';
import Text from '../../../../lib/text';
import Textarea from '../../../../lib/textarea';
import Select from '../../../../lib/select';
import Checkbox from '../../../../lib/checkbox';
import RadioGroup from '../../../../lib/radio_group';


const defaultModel = {
  firstname: 'Abylay',
  sex: 'm',
  email: 'ablay@keldibek.me',
  about: 'Yop yop',
  married: true,
  age: 2,
};

const validation = {
  firstname: {
    required: true,
    validate: [(value) => value.length > 5],
    message: 'Wrong name format',
  },

  about: {
    validate: [(value) => value.length > 20],
    message: 'About should be longer',
  },

  sex: {
    required: true,
    message: 'Sex is required',
  },
};

const sexOptions = [
  { value: null, content: 'select sex' },
  { value: 'm', content: 'male' },
  { value: 'f', content: 'female' },
];

const ageOptions = [
  { value: 1, content: '1-20' },
  { value: 2, content: '20-40' },
  { value: 3, content: '40+' },
];

const handleValidSubmit = (model) => console.warn('Submit Success!', model);
const handleInvalidSubmit = () => console.error('Submit Error!');
const handleSubmit = (event) => console.warn('Native Event', event);

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { customErrors: null, isLocked: true };
    this.setCustomErrors = this.setCustomErrors.bind(this);
    this.toggleLock = this.toggleLock.bind(this);
  }

  setCustomErrors() {
    this.setState({
      customErrors: {
        firstname: 'Custom Error Message',
        about: 'Write something',
      },
    });
  }

  toggleLock() {
    const update = ({ isLocked }) => ({ isLocked: !isLocked });
    this.setState(update);
  }

  render() {
    const { customErrors, isLocked } = this.state;

    const personForm = (
      <Fragment>
        <p><Text field="firstname" /></p>
        <p><Text field="email" type="email" /></p>
        <p><Textarea field="about" /></p>
        <p><Select field="sex" options={sexOptions} /></p>
        <p><Checkbox field="married" /></p>
        <p><RadioGroup field="age" options={ageOptions} /></p>
        <p><button type="submit">Submit</button></p>
      </Fragment>
    );

    return (
      <article>
        <h1>Ornament Form Kit</h1>
        <section>
          <h2>Empty Form</h2>
          <Form onValidSubmit={handleValidSubmit}>
            {personForm}
          </Form>
        </section>

        <hr />

        <section>
          <h2>Prefilled Data</h2>
          <Form defaultModel={defaultModel} onValidSubmit={handleValidSubmit}>
            {personForm}
          </Form>
        </section>

        <hr />

        <section>
          <h2>Form with validation</h2>
          <Form
            validation={validation}
            errors={customErrors}
            onSubmit={handleSubmit}
            onValidSubmit={handleValidSubmit}
            onInvalidSubmit={handleInvalidSubmit}
          >
            {({ errors }) => (
              <Fragment>
                <p>
                  <Text field="firstname" />
                  {errors.firstname ? <strong>{errors.firstname}</strong> : null}
                </p>
                <p>
                  <Textarea field="about" />
                  {errors.about ? <strong>{errors.about}</strong> : null}
                </p>
                <p>
                  <Select field="sex" options={sexOptions} />
                  {errors.sex ? <strong>{errors.sex}</strong> : null}
                </p>
                <p>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={this.setCustomErrors}>Set Custom errors</button>
                </p>
              </Fragment>
            )}
          </Form>
        </section>

        <hr />

        <section>
          <h2>Locked Form</h2>
          <Form
            locked={isLocked}
            onSubmit={handleSubmit}
            onValidSubmit={handleValidSubmit}
            onInvalidSubmit={handleInvalidSubmit}
          >
            {({ locked }) => (
              <Fragment>
                <p>{locked ? 'Locked' : 'Unlocked'}</p>
                <p><Text field="text" /></p>
                <p><Textarea field="textarea" /></p>
                <p><Select field="select" options={sexOptions} /></p>
                <p><RadioGroup field="radio_group" options={ageOptions} /></p>
                <p><Checkbox field="checkbox" /></p>
                <p>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={this.toggleLock}>Toggle Lock</button>
                </p>
              </Fragment>
            )}
          </Form>
        </section>
      </article>
    );
  }
}

export default Home;
