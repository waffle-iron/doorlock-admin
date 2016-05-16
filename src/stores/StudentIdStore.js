import alt from '../alt';
import StudentIdActions from '../actions/StudentIdActions';
import StudentIdSource from '../sources/StudentIdSource';

class StudentIdStore {
  constructor() {
    this.studId = '';
    this.isLoading = false;
    this.bindActions(StudentIdActions);
    this.registerAsync(StudentIdSource);
  }
  onSetStudentId(id) {
    this.studId = id;
  }
  onScanCardSuccess(newId) {
    if( newId ) {
      this.studId = newId;
    }
    this.isLoading = false;
  }
  onScanCardError(err) {
    this.isLoading = false;
  }
  onScanCard() {
    this.isLoading = true;
    if (!this.getInstance().isLoading()) {
      this.getInstance().scanNewCard();
    }
  }
}

export default alt.createStore(StudentIdStore, 'StudentIdStore');
