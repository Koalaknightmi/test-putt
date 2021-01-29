import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID
};

class firebase {
  constructor(){
    app.initializeApp(firebaseConfig);

    /* Helper */
    this.fieldValue = app.firestore.FieldValue;
    app.firestore().enablePersistence({synchronizeTabs:true});
    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.firestore();
    
    /* Social Sign In Method Provider */
    //this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  signUpWithPassword = (email,password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  signInWithPassword = (email,password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  /*signInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);*/

  signOut = () => this.auth.signOut();

  passwordReset = email => this.auth.sendPasswordResetEmail(email);
  passwordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  authListener = (pass,fail) => 
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user(user.uid)
          .get()
          .then(data => {
            const user2 = data.data();

            user = {
              uid: user.uid,
              email: user.email,
              providerData: user.providerData,
              ...user2,
            };

            pass(user);
          });
      } else {
        fail();
      }
    });

  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');
  puttlogs = () => this.db.collection('putts');
  uputtlog = uid => this.db.doc(`putts/${uid}`).collection('log')
  puttlogstats = uid => this.db.doc(`putts/${uid}/stats/stats`);
  puttlog = (uid,logid) => this.db.doc(`putts/${uid}/log/${logid}`);
}

export default firebase