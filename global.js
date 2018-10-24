// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
window.btoa = require('Base64').btoa;
import 'core-js/modules/es6.typed.uint8-array'
// Needed so that 'stream-http' chooses the right default protocol.
global.location = {
  protocol: 'file:',
};

// Don't do this in production. You're going to want to patch in
// https://github.com/mvayngrib/react-native-randombytes or similar.
