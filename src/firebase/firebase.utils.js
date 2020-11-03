import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDhELLOgtfZDPiB-ARwP-K-3TbjEbZ3DVA",
  authDomain: "crwn-db-cf44f.firebaseapp.com",
  databaseURL: "https://crwn-db-cf44f.firebaseio.com",
  projectId: "crwn-db-cf44f",
  storageBucket: "crwn-db-cf44f.appspot.com",
  messagingSenderId: "894776931669",
  appId: "1:894776931669:web:02b7cb87b165ac577a2bdc",
  measurementId: "G-7F8CM83WDT",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
    return userRef;
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
