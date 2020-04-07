import * as firebase from 'firebase'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'
// import BOT_USER from '../screens/Chatbot';
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
    const BOT_USER = {
       _id: 2,
       name: 'escapism bot',
     };
    var ref =firebase.database().ref('users/' + `${userData.uid}`);
    ref.set(userData).then((data)=>{
        console.log('data ' , data)
    }).catch((error)=>{
        console.log('error ' , error)
    })
    var ts = firebase.database.ServerValue.TIMESTAMP;
   var name =userData.name;
   const msg=
   { _id:1,
     text: `hi ${userData.name} this is escapism we are here for you feel free talk to me`,
     createdAt: ts,
     user: BOT_USER,
   }
     return ref.child('chat').push(msg);

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
    },




     fetchChat: ()=> {
       let user = firebase.auth().currentUser
         var userid= user.uid;
         if(user){
         var ref = firebase.database().ref('users/' + `${userid}`).child('chat');
           return ref.once('value').then((snapshot) => {
         const chatObject = snapshot.val();


        let chatList = Object.keys(chatObject).map(key => ({
         ...chatObject[key],
       }));


          return chatList.reverse();
         }).catch(function(error) {
           console.log( error)
         })
       }

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
     }).catch((error)=>{
         console.log('error ' , error)
     })
    },

    uploadVideo: async (uri) => {
    let user = firebase.auth().currentUser
    var userid= user.uid;
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      let base64 = reader.result;
    };
    var name="123"+Date.now();
    var ref = firebase.storage().ref("videos/" + name).child(`${userid}`);
    const result2 = await ref.put(blob)
    const downloadURL = await result2.ref.getDownloadURL();
    console.log(downloadURL);
    return result2;
  },
  textApi: (text) => {
  let user = firebase.auth().currentUser
    var userid= user.uid;
    var ref = firebase.database().ref('users/' + `${userid}` ).child("text");
    ref.push(text);
 },
  saveEmo: async (emo) => {


      return firebase.database().ref('textEmo').transaction((textEmo) => {
        if(emo === "sad") {
          let oldEmo = textEmo.sad;
          let newEmo = oldEmo + 1 ;
          textEmo.sad = newEmo;
        }
        //return textEmo;
      },
      );


   },



    }

export default Firebase
