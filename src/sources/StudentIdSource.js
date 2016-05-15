import Actions from '../actions/StudentIdActions';

const StudentIdSource = {
  scanNewCard: {
    remote() {
      return new Promise( (resolve, reject) => {
        window.setTimeout( () => {
          resolve('funker3244');
        }, 1500);
      });
    },
    loading: Actions.scanCardLoading,
    success: Actions.scanCardSuccess,
    error: Actions.scanCardError
  }

}

export default StudentIdSource;
