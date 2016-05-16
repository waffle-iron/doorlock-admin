import React, { PropTypes } from 'react'
import Formsy from 'formsy-react';
import FRC, { Input } from 'formsy-react-components';
import { Form } from 'formsy-react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import auth from '../../utils/auth';

import styles from './Login-style.css';

const LoginForm = React.createClass({
    mixins: [FRC.ParentContextMixin],
    propTypes: {
        children: React.PropTypes.node
    },
    render() {
        return (
            <Form
              className={this.getLayoutClassName()}
              {...this.props}
              ref="formsy"
            >
                {this.props.children}
            </Form>
        );
    }
});


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDisabled: true,
      errorMsg: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onInvalid = this.onInvalid.bind(this);
  }
  onSubmit(model) {
    const { submit, location } = this.props;

    if(submit) {
      submit(model);
      return;
    }

    auth.login(model, (status) => {
      if( status !== true )
        return this.setState({ errorMsg: status });
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname);
      } else {
        this.props.router.replace('/');
      }
    });

  }
  onValid() {
    this.setState({ submitDisabled: false });
  }
  onInvalid() {
    this.setState({ submitDisabled: true });
  }
  render () {
    return (
      <div className={styles.box}>
        <LoginForm
          onValidSubmit={this.onSubmit}
          onValid={this.onValid}
          onInvalid={this.onInvalid}
          layout='elementOnly'
        >
          <fieldset>
            <legend>Hackerspace UI</legend>
            <div className={styles.content}>
              <Input
                name='username'
                value=''
                type='text'
                label='Brukernavn'
                placeholder='Brukernavn'
                required
                />

              <Input
                name='userpass'
                value=''
                label='Passord'
                type='password'
                placeholder='Passord'
                required
                />
              <button type='submit' className='btn btn-primary btn-block'
                formNoValidate={true} disabled={this.state.submitDisabled}
                >Logg inn</button>
            </div>
          </fieldset>
        </LoginForm>
        { this.state.errorMsg ? <p>{this.state.errorMsg}</p> : '' }
      </div>
    );
  }
}

export default withRouter(Login);
