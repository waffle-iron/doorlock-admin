import io from 'socket.io-client';
import Promise from 'bluebird';
import { baseUrl } from 'config';

const idFetcher = () => {

  return new Promise( (resolve, reject) => {
    let socket = io(baseUrl + ':8080/get-id');
    socket.on('connect', function () {
      socket.emit('scanNewId', function (id) {

        if(id) {
          resolve(id);
        }
        else {
          reject(new Error('Scanning brukte for lang tid'));
        }

      });
    });
  });
}

export default idFetcher;
