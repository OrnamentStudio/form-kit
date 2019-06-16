/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] no-console: 0 */

const React = require('react');
const { render } = require('react-dom');

const Form = require('../form');
const Text = require('../text');
const Textarea = require('../textarea');
const Select = require('../select');
const Checkbox = require('../checkbox');
const RadioGroup = require('../radio_group');
const Submit = require('../submit');

const { PureComponent, Fragment, createRef } = React;


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
    validate: [value => value.length > 5],
    message: 'Wrong name format',
  },

  about: {
    validate: [value => value.length > 20],
    message: 'Description should be longer',
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

const handleValidSubmit = model => console.warn('Submit Success!', model);
const handleInvalidSubmit = () => console.error('Submit Error!');
const handleSubmit = event => console.warn('Native Event', event);

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLocked: true };
    this.toggleLock = this.toggleLock.bind(this);
    this.setCustomErrors = this.setCustomErrors.bind(this);
    this.errorForm = createRef();
  }

  setCustomErrors() {
    this.errorForm.current.setErrors({
      firstname: 'Error Custom',
      about: 'Error Custom',
    });
  }

  toggleLock() {
    const update = ({ isLocked }) => ({ isLocked: !isLocked });
    this.setState(update);
  }

  render() {
    const { isLocked } = this.state;

    const personForm = (
      <Fragment>
        <p><Text field="firstname" /></p>
        <p><Text field="email" type="email" /></p>
        <p><Textarea field="about" /></p>
        <p><Select field="sex" options={sexOptions} /></p>
        <p>
          <Checkbox field="married" />
          Married
        </p>
        <p><RadioGroup field="age" options={ageOptions} /></p>
        <p><Submit>Submit</Submit></p>
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

        <section>
          <h2>Prefilled Data</h2>
          <Form defaultModel={defaultModel} onValidSubmit={handleValidSubmit}>
            {personForm}
          </Form>
        </section>

        <section>
          <h2>Form with validation</h2>
          <Form
            validation={validation}
            onSubmit={handleSubmit}
            onValidSubmit={handleValidSubmit}
            onInvalidSubmit={handleInvalidSubmit}
            ref={this.errorForm}
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
                  <Submit>Submit</Submit>
                  <button type="button" onClick={this.setCustomErrors}>Set Custom errors</button>
                </p>
              </Fragment>
            )}
          </Form>
        </section>

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
                <p>
                  <Checkbox field="checkbox" />
                  Checkbox
                </p>
                <p>
                  <Submit>Submit</Submit>
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

render(<App />, global.document.getElementById('root'));
