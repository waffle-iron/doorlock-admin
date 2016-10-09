import { testToken } from 'config';

var localStorageMock = {
  token: testToken
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
