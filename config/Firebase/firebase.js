import * as firebase from 'firebase'
import 'firebase/auth'
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
    var ref =firebase.database().ref('users/').child(`${userData.uid}`);
    ref.set(userData).then((data)=>{
    //  ref.off();
        console.log('data ' , data)
    }).catch((error)=>{
        console.log('error ' , error)
    })
},

getUserDetails: () => {
   let user = firebase.auth().currentUser
     var userid= user.uid;
     var ref = firebase.database().ref('users/').child(`${userid}`);

       return ref.once('value').then((snapshot) => {
       var name = snapshot.child("name").val();
       var email = snapshot.child("email").val();
       var uri = snapshot.child("avatar").val();
       var uid = snapshot.child("uid").val();


       var arr =[name,email,uri,uid];
       return arr;
      // ref.off();
     }).catch(function(error) {
       console.log( error)
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
    var ref = firebase.database().ref('users/').child(`${userid}`);
    return ref.update( {avatar: image});
    //ref.off();
    },


     fetchChat: ()=> {
       let user = firebase.auth().currentUser
         var userid= user.uid;
         var ref = firebase.database().ref('users/' + `${userid}`).child('chat');
           return ref.once('value').then((snapshot) => {

        const chatObject = snapshot.val();


        let chatList = Object.keys(chatObject).map(key => ({
         ...chatObject[key],
       }));


          return chatList.reverse();
      //    ref.off();
         }).catch(function(error) {
           console.log( error)
         })

  },

pushMessage: message  =>{
     let user = firebase.auth().currentUser;
     var userid= user.uid;
      var ts = firebase.database.ServerValue.TIMESTAMP;
      var ref = firebase.database().ref('users/' + `${userid}`).child('chat');
     ref.push(
       {
         _id:message._id,
         text: message.text,
         createdAt: ts,
         user:message.user
       }
     ).then((data)=>{
      // ref.off();
     }).catch((error)=>{
         console.log('error ' , error)
     })
    },
    off: async()=> {
      let user = firebase.auth().currentUser;
      var userid= user.uid;
      var ref = firebase.database().ref('users/').child(`${userid}`);
      await ref.off();
    },

    }

export default Firebase
