import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBC0EUif-KJ3oD6sATntBFvGFnbGrPGahE",
  authDomain: "crwnclothing-sashaneprokin.firebaseapp.com",
  databaseURL: "https://crwnclothing-sashaneprokin.firebaseio.com",
  projectId: "crwnclothing-sashaneprokin",
  storageBucket: "crwnclothing-sashaneprokin.appspot.com",
  messagingSenderId: "362053450595",
  appId: "1:362053450595:web:2955fa5b2fe436e9c63156",
  measurementId: "G-DGKZ2J1Z6P"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
}; 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;