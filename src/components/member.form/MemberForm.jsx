import React, { PropTypes } from 'react';
import Formsy from 'formsy-react';
import { Input } from 'formsy-react-components';
import { Form } from 'formsy-react';

import AddStudentCardId from '../member.addid/AddStudentCardId.jsx';

import styles from './MemberForm-style.css';

Formsy.addValidationRule('fourYearDecimals', function (values, value) {
  return value.toString().length === 4;
});

class MemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitDisabled: true
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onInvalid = this.onInvalid.bind(this);
  }
  onSubmit(model,reset,invalidate) {
    const { submit } = this.props;
    submit(model,reset,invalidate);
  }
  onValid() {
    this.setState({ submitDisabled: false });
  }
  onInvalid() {
    this.setState({ submitDisabled: true });
  }
  renderLoadingScreen() {
    return (
      <div className={styles.loadingBox}><i className='fa fa-cog fa-spin fa-5x fa-fw'></i></div>
    );
  }
  render () {
    const { defaultValues, changeMode, memberDontExist } = this.props;
    const { isLoading, failedId } = this.props;
    const { studentIdProps, actions } = this.props;

    const addEdit = changeMode ? 'Endre' : 'Legg til';
    const header = `${addEdit} medlem`;

    if( memberDontExist ) {
      return (
        <h5 style={{textAlign:'center'}}>{`Medlem med id ${failedId} finnes ikke`}</h5>
      );
    }

    return(
      <Form
        onValidSubmit={this.onSubmit}
        onValid={this.onValid}
        onInvalid={this.onInvalid}
        className={styles.form}
      >
        { isLoading ? this.renderLoadingScreen() : ''}
        <fieldset>
          <legend>{header}</legend>
          <Input
            name="firstName"
            id="firstName"
            value={defaultValues.firstName}
            label="Fornavn"
            type="text"
            validations={{
              matchRegexp: /^[a-zA-Z \-æøåÆØÅ]*$/
            }}
            validationErrors={{
              matchRegexp: 'Kun bokstaver og bindestreker er godtatt'
            }}
            placeholder="Medlemmets fornavn"
            required
            />

          <Input
            name="lastName"
            value={defaultValues.lastName}
            label="Etternavn"
            type="text"
            validations={{
              matchRegexp: /^[a-zA-Z æøåÆØÅ]*$/
            }}
            validationErrors={{
              matchRegexp: 'Kun bokstaver er godtatt'
            }}
            placeholder="Medlemmets etternavn"
            required
            />

          <Input
            name="userName"
            value={defaultValues.userName}
            label="Brukernavn"
            type="text"
            validations="isAlphanumeric"
            validationErrors={{
              isAlphanumeric: 'Kun bokstaver og tall er godtatt'
            }}
            placeholder="Medlemmets brukernavn på UIT"
            required
            />

          <Input
            name="graduationYear"
            value={defaultValues.graduationYear}
            min={2010}
            label="Avgangsår"
            type="number"
            autoComplete={false}
            validations="fourYearDecimals"
            validationErrors={{
              fourYearDecimals: 'Årstall med format YYYY'
            }}
            placeholder="Året medlemmet er ferdig på UIT"
            required
            />

          <Input
            name="privateEmail"
            value={defaultValues.privateEmail}
            label="Privat e-post"
            type="email"
            autoComplete={false}
            placeholder="Medlemmets private e-post (ola@gmail.com)"
            validations="isEmail"
            validationErrors={{
              isEmail: 'Dette ser ikke ut som en gyldig e-postadresse'
            }}
            />

          <Input
            name="mobile"
            value={defaultValues.mobile}
            label="Telefonnummer"
            type="text"
            autoComplete="off"
            placeholder="Medlemmets telefonnummer ( 12345678 )"
            validations="isNumeric,isLength:8"
            validationErrors={{
              isNumeric: 'Dette ser ikke ut som et gyldig telefonnummer',
              isLength: 'Krever 8 siffer'
            }}
            />

          <AddStudentCardId {...studentIdProps} actions={actions}/>

        </fieldset>

        <div className={styles.btnBox}>
          <input type="submit" className="btn btn-primary" formnovalidate={true}
            disabled={this.state.submitDisabled} value={addEdit} />
        </div>

      </Form>
    );
  }
}

MemberForm.defaultProps = {
  defaultValues: {
    firstName: '',
    lastName: '',
    userName: '',
    graduationYear: '',
    privateEmail: '',
    mobile: ''
  },
  changeMode: false,
  memberDontExist: false,
  isLoading: false
}

export default MemberForm;
