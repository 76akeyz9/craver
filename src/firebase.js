import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAIZ_iuzewEYeXo-4BFG0zC7z9R5Vm9i6w",
  authDomain: "craver-react-7590b.firebaseapp.com",
  databaseURL: "https://craver-react-7590b.firebaseio.com",
  projectId: "craver-react-7590b",
  storageBucket: "craver-react-7590b.appspot.com",
  messagingSenderId: "663703087919",
  appId: "1:663703087919:web:e19fa2b072ee7309314fda",
  measurementId: "G-GJNMWHW2N3"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage} ;
