import * as firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyA0lJa_h0RJM3qAA84UxarWJusScjxdxa8",
  authDomain: "bachaturo2.firebaseapp.com",
  databaseURL: "https://bachaturo2.firebaseio.com",
  projectId: "bachaturo2",
  storageBucket: "bachaturo2.appspot.com",
  messagingSenderId: "920200474655",
  appId: "1:920200474655:web:0f81d237084b28326ce52a",
  measurementId: "G-5N0SQHT8MZ"
});

export default app