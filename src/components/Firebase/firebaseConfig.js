import * as firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCDIYTq0me9mEP8bHgokpr3jsGLzlkIyws",
    authDomain: "sa-trioternura.firebaseapp.com",
    databaseURL: "https://sa-trioternura.firebaseio.com",
    projectId: "sa-trioternura",
    storageBucket: "sa-trioternura.appspot.com",
    messagingSenderId: "800412804759",
    appId: "1:800412804759:web:bbd4177657f3e5eabdebd2",
    measurementId: "G-ZKMKD7Z9TY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };