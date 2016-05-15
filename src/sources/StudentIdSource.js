import Actions from '../actions/StudentIdActions';
import io from 'socket.io-client';


const StudentIdSource = {
  scanNewCard: {
    remote() {
      return new Promise( (resolve, reject) => {

        var socket = io('http://doorlock:8080');
        socket.on('connect', function () {
          socket.emit('scanNewId', function (id) {
            resolve(id);
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
