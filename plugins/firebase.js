import firebase from "firebase/app"; // firebase全般
import "firebase/auth"; // ログイン機能
import "firebase/firestore"; // DB機能

// firebaseの準備ができている場合のみ設定
if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyCkSR8k2tJotwsnmLSSnjuPupn087CPE0s",
    authDomain: "slack-clone-app-34a0b.firebaseapp.com",
    databaseURL: "https://slack-clone-app-34a0b.firebaseio.com",
    projectId: "slack-clone-app-34a0b",
    storageBucket: "slack-clone-app-34a0b.appspot.com",
    messagingSenderId: "557320155071"
  };
  firebase.initializeApp(config);
}

const db = firebase.firestore();

export { firebase, db };
