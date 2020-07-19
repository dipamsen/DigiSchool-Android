import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCH12W9j5x41cXRrlXaDHij3rEjsL1fiQQ',
  authDomain: 'shoot-n-survive.firebaseapp.com',
  databaseURL: 'https://shoot-n-survive.firebaseio.com',
  projectId: 'shoot-n-survive',
  storageBucket: 'shoot-n-survive.appspot.com',
  messagingSenderId: '192631098144',
  appId: '1:192631098144:web:7f7ec26f0be19d1dc42545',
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase.database();