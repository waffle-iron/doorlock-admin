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
    return err;
  }
}

export default alt.createActions(StudentIdActions);
