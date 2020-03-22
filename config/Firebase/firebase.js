import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); }

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email)
  },
  createNewUser: userData =>{

    firebase.database().ref('users/').child(`${userData.uid}`).set(userData).then((data)=>{
        console.log('data ' , data)
    }).catch((error)=>{
        console.log('error ' , error)
    })
},

getUserDetails: () => {
   let user = firebase.auth().currentUser
     var userid= user.uid;
       return firebase.database().ref('users/').child(`${userid}`).once('value').then((snapshot) => {
       var name = snapshot.child("name").val();
       var email = snapshot.child("email").val();
       var uri = snapshot.child("avatar").val();

       var arr =[name,email,uri];
       return arr;
     })
     .catch(function(error) {
       console.log('Error getting user: ', error)
     })
 },

  uploadAvatar:async (avatarImage) => {
     let user = firebase.auth().currentUser
     var userid= user.uid;
        const response = await fetch(avatarImage);
       const blob = await response.blob();

       var ref = firebase.storage().ref().child("userPic/" + `${userid}`);
       const snapshot = await ref.put(blob);
      var image = await snapshot.ref.getDownloadURL();
      return firebase.database().ref('users/').child(`${userid}`).update( {avatar: image});
     }


}

export default Firebase
