import alt from '../alt'

class StudentIdActions {
  setStudentId(id) {
    return id;
  }
  scanCard() {
    return true;
  }
  scanCardSuccess(newId) {
    return newId;
  }
  scanCardError(err) {
    debugger;
    return err;
  }
}

export default alt.createActions(StudentIdActions);
