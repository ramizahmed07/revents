import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBFjNeabERO6-BJ8HApgIoZQtndWK0uAOI',
  authDomain: 'revents-3f371.firebaseapp.com',
  databaseURL: 'https://revents-3f371.firebaseio.com',
  projectId: 'revents-3f371',
  storageBucket: '',
  messagingSenderId: '651138419637',
  appId: '1:651138419637:web:23223582baed18baace7fc',
  measurementId: 'G-5FRNR0HTHF'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
