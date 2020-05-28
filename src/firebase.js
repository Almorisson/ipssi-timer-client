import * as firebase from 'firebase';
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCI_AKmyAQEpAoApwUCrCAQ-HWnLw1_CZs",
    authDomain: "ipssi-project-timer-manager.firebaseapp.com",
    //databaseURL: "https://ipssi-project-timer-manager.firebaseio.com",
    projectId: "ipssi-project-timer-manager",
    storageBucket: "ipssi-project-timer-manager.appspot.com",
    //messagingSenderId: "983685361515",
    appId: "1:983685361515:web:0e49f2b96aeb904c9ee62e",
    measurementId: "G-QBYYJDL87V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
