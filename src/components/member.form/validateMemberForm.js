const validateMemberForm = (values) => {
  const errors = {}

  const requiredError = 'Må fylles ut'
  const lettersAndLines = /^[a-zA-Z \-æøåÆØÅ]*$/
  const lettersAndLinesError = 'Kun bokstaver og bindestreker'

  if(!values.firstName) {
    errors.firstName = requiredError
  }
  else if (!lettersAndLines.test(values.firstName)) {
    errors.firstName = lettersAndLinesError
  }

  if(!values.lastName) {
    errors.lastName = requiredError
  }
  else if (!lettersAndLines.test(values.lastName)) {
    errors.lastName = lettersAndLinesError
  }

  if(!values.userName) {
    errors.userName = requiredError
  }
  else if (!/^[a-z0-9æøå]+$/.test(values.userName)) {
    errors.userName = 'Kun små bokstaver og tall i ett ord'
  }

  if(!values.graduationYear) {
    errors.graduationYear = requiredError
  }
  else if (values.graduationYear && isNaN(Number(values.graduationYear))) {
    errors.graduationYear = 'Kan kun inneholde tall (2004)'
  }
  else if (values.graduationYear && values.graduationYear.toString().length !== 4) {
    errors.graduationYear = 'Skal være 4 siffer (YYYY)'
  }

  if (values.privateEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.privateEmail)) {
    errors.privateEmail = 'Ikke gyldig e-postadresse (ola@gmail.com)'
  }

  if (values.mobile && isNaN(Number(values.mobile))) {
    errors.mobile = 'Kan kun inneholde tall (12345678)'
  }
  else if (values.mobile && values.mobile.length !== 8) {
    errors.mobile = 'Må være 8 siffer'
  }

  if ( !values.studentCardId ) {
    errors.studentCardId = 'Studentkort må scannes'
  }


  return errors
}

export default validateMemberForm;
