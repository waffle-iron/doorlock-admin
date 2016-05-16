import Actions from '../actions/StudentIdActions';
import io from 'socket.io-client';


const StudentIdSource = {
  scanNewCard: {
    remote() {
      return new Promise( (resolve, reject) => {

        let serverTimeout = window.setTimeout( () => {
          reject({
            message: 'Serveren svarer ikke'
          });
        }, 12000);

        let socket = io('http://doorlock:8080');
        socket.on('connect', function () {
          socket.emit('scanNewId', function (id) {
            if(id) {
              window.clearTimeout(serverTimeout);
              resolve(id);
            }
            else {
              window.clearTimeout(serverTimeout);
              reject({
                message: 'Scanning feilet, prøv på nytt'
              });
            }
          });
        });

        // Test return
        // window.setTimeout( () => {
        //   resolve('funker3244');
        // }, 1500);
      });
    },
    loading: Actions.scanCardLoading,
    success: Actions.scanCardSuccess,
    error: Actions.scanCardError
  }

}

export default StudentIdSource;
