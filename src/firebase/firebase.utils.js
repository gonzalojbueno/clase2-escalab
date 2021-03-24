import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA80iYUYpTzO-zJNpRcw-hG-m4LEgcgtMs",
    authDomain: "fir-react-app-48ed7.firebaseapp.com",
    projectId: "fir-react-app-48ed7",
    storageBucket: "fir-react-app-48ed7.appspot.com",
    messagingSenderId: "12050835228",
    appId: "1:12050835228:web:3543854502c6726fedbcd9"
  };
  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, ...additionalData) => {
        if (!userAuth) return ;

        const userRef = firestore.doc (`users/${userAuth.uid}`);
        
        const snapShot = await userRef.get();

        if (!snapShot.exist) {
            const { displayName , email } = userAuth;
            
            const createdAt = new Date();
            try {
                await userRef.set ({
                   displayName,
                   email,
                   createdAt,
                   ...additionalData  
                });
                } catch (error) {
                    console.log ('error creating user',error.message);
                }
        }

        return userRef;
  };

  export const auth = firebase.auth ();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters ({ prompt : 'select_account'});
  export const signInWithGoogle = () => auth.sighInWithPopUp (provider);

export default firebase;