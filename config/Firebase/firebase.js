import * as firebase from 'firebase'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'
import moment from 'moment';

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
    var ref =firebase.database().ref('users/' + `${userData.uid}`);

    const BOT_USER = {
       _id: 2,
       name: 'escapism bot',
       avatar: 'https://i.imgur.com/7k12EPD.png'

     };
    var arr=[ 'walking','running', 'swimming','playMusic','listenTOmusic','hangouts','studying','videoGames']

    ref.set(userData).then((data)=>{
        console.log('data ' , data)
    }).catch((error)=>{
        console.log('error ' , error)
    });
    ref.child("emo").set({
    textEmo: {
     sad: 1,
     angry: 1,
     happy:1,
     fear :1,
     excited:1,
     indifferent:1
     }
     });
   //
   //  var ts = firebase.database.ServerValue.TIMESTAMP;
   var name =userData.name;
   const msg=
   { _id:1,
     text: `hi ${userData.name} this is escapism we are here for you feel free talk to me`,
    // createdAt: ts,
     user: BOT_USER,
     quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: '😋 hi escapism',
          //value: 'yes',
        },
        {
          title: 'nice to meet you!',
          //value: 'yes_picture',
        },
        {
          title: 'hi there',
          //value: 'no',
        },
      ],
    }
   };
   var date = moment().utcOffset('+02:00').format('DD-MM-YYYY');
   ref.child('activitynames').child('activity').set(arr);
   firebase.database().ref('users/' + `${userData.uid}`).child('welcomeMsg').push(msg);
   return firebase.database().ref('users/' + `${userData.uid}`).child('status').child('statusChat').child(`${date}`).push(msg);



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
         var ref = firebase.database().ref('users/' + `${userid}`).child('welcomeMsg');
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
      var ref = firebase.database().ref('users/' + `${userid}`);
     return ref.child('chat').push(
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
    statusLog: message =>{
      var date = moment().utcOffset('+02:00').format('DD-MM-YYYY');
         let user = firebase.auth().currentUser;
         var userid= user.uid;
          var ts = firebase.database.ServerValue.TIMESTAMP;
          var ref = firebase.database().ref('users/' + `${userid}`).child('status').child('statusChat').child(`${date}`);
         return ref.push(
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
        fetchStatusChat: (date) =>{
          let user = firebase.auth().currentUser
            var userid= user.uid;
            if(user){
            var ref = firebase.database().ref('users/' + `${userid}`).child('status').child('statusChat').child(`${date}`);
            return ref.once('value').then((snapshot) => {
          const statusChatObject = snapshot.val();


         let chatList = Object.keys(statusChatObject).map(key => ({
          ...statusChatObject[key],
        }));


           return chatList.reverse();
          }).catch(function(error) {
            console.log( error)
          })
        }
            },

            fetchStatusEmo: () =>{
              let user = firebase.auth().currentUser
                var userid= user.uid;
                if(user){
                var ref = firebase.database().ref('users/' + `${userid}`).child('status').child('statusEmo');
                  return ref.once('value').then((snapshot) => {
                const statusEmoObject = snapshot.val();


               let statusEmoList = Object.keys(statusEmoObject).map(key => ({
                ...statusEmoObject[key],
              }));


                 return statusEmoList;
                }).catch(function(error) {
                  console.log( error)
                })
              }
                },


 saveEmo: async (emo) => {
   var date = moment().utcOffset('+02:00').format('DD-MM-YYYY');

   let user = firebase.auth().currentUser
     var userid= user.uid;
     var ref = firebase.database().ref('users/' + `${userid}`).child("emo");
     let emoition
   ref.child("textEmo").transaction((data) => {
       if(data) {
         switch(emo) {
         case "sad":
           if(data.sad !== null && data.sad < 5) {
               data.sad++;}
               else if (data.sad > 4 ) {
                  data.sad = 2;
               }
           break;
           case "happy":
           if(data.happy !== null && data.happy < 5 ) {
               data.happy++;}
           else if (data.happy > 4 ) {
              data.happy = 2;
           }
            break;

            case "angry":
              if(data.angry !== null && data.angry < 5) {
                  data.angry++;}
                  else if (data.angry > 4 ) {
                     data.angry = 2;
                  }
              break;
              case "fear":
              if(data.fear !== null && data.fear < 5) {
                  data.fear++;}
                  else if (data.fear > 4 ) {
                     data.fear = 2;
                  }
               break;

               case "excited":
                 if(data.excited !== null && data.excited < 5) {
                     data.excited++;}
                     else if (data.excited > 4 ) {
                        data.excited = 2;
                     }
                 break;
                 case "indifferent":
                 if(data.indifferent !== null && data.indifferent < 5) {
                     data.indifferent++;}
                     else if (data.indifferent > 4 ) {
                        data.indifferent = 2;
                     }
                  break;

          }

       }

       let emotions = data;
       emoition = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);

       firebase.database().ref('userEmo/' + 'textEmo').set(emoition);

       return data;

  })
  .then(console.log('Done'))
  .catch((error) => console.log(error));


  // return firebase.database().ref('users/' + `${userid}`).child('status').child("statusEmo").child(`${date}`).set({
  //   emo:emoition,
  //   date:date
  // });
  return firebase.database().ref('users/' + `${userid}`).child('emo').child("textEmoo").child(`${date}`).push(emoition);
 },
 textEmoLog: ()=> {
   let user = firebase.auth().currentUser
     var userid= user.uid;
     var date = moment().utcOffset('+02:00').format('DD-MM-YYYY');

     if(user){
     var ref = firebase.database().ref('users/' + `${userid}`).child('emo').child("textEmoo").child(`${date}`);
    return ref.once('value').then((snapshot) => {
     const textObject = snapshot.val();


    let textList = Object.keys(textObject).map(key => ({
     ...textObject[key],
   }));


      return textList;
     }).catch(function(error) {
       console.log( error)
     })
   }

},


    saveVideoEmo: async (emotion) => {
      let user = firebase.auth().currentUser
      var userid= user.uid;
      var date = moment().utcOffset('+02:00').format('DD-MM-YYYY');
      firebase.database().ref('users/' + `${userid}`).child('emo').child('videoEmo').push({
        emotion,
        date,
      });
      firebase.database().ref('users/' + `${userid}`).child('status').child("statusEmo").child(`${date}`).set({
        emo:emotion,
        date:date
      });

      firebase.database().ref('userEmo/' + 'emo').set(emotion);
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
          var ref = firebase.storage().ref("videos/" + `${userid}`).child(name);
          const result2 = await ref.put(blob)
          const downloadURL = await result2.ref.getDownloadURL();
          console.log(downloadURL);
          return result2;
        },

        uploadImage: async (Image) => {
          const response = await fetch(Image);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            let base64 = reader.result;
            //console.log(base64);
          };
          var name="123"+Date.now();
          var ref = firebase.storage().ref().child("userPic/" + name);
          const snapshot = await ref.put(blob);
          var image = await snapshot.ref.getDownloadURL();
          console.log(image)

          //var ref = firebase.database().ref('users/').child(name);
          return image
          //ref.off();
        },


    _showdata: async () => {
       let arrdata = []
        firebase.database().ref('Entry/').on('value', (snapshot) =>{
          arrdata = snapshot.val().selectedItems
        })
        return arrdata;
      },


    _saveoption: async (options, i) => {
        //this.setState({ options}, () => console.warn('Selected Activities: ', options))
        console.log(options);
        let actname;
        let user = firebase.auth().currentUser
        var userid= user.uid;
        firebase.database().ref('users/' + `${userid}`).child('optionactivity/').child('optionactivityname/').on('value', (snapshot) =>{
            actname = snapshot.val().list
        });
        firebase.database().ref('users/' + `${userid}`).child('optionactivity/').child(`${actname[i]}`).set({
          options
        });
      },


    _callactivityname: async () => {
          let actlist = [];
          let user = firebase.auth().currentUser
          var userid= user.uid;
          firebase.database().ref('users/' + `${userid}`).child('activitynames').on('value', (snapshot) => {
            actlist = snapshot.val().activity
          });
          console.log(actlist)
          return actlist
        },


    _deleteactivityname: async (activity) => {
          let user = firebase.auth().currentUser
          var userid= user.uid;
          firebase.database().ref('users/' + `${userid}`).child('activitynames').set({
            activity
          });
        },

        _addnewactivityname: async (activelist, newActivity) => {
          let user = firebase.auth().currentUser
          var userid= user.uid;
          firebase.database().ref('users/' + `${userid}`).child('activitynames').on('value', (snapshot) => {
            activelist = snapshot.val().activity
          });
          activelist[activelist.length]=newActivity
          let activity = activelist
          firebase.database().ref('users/' + `${userid}`).child('activitynames').set({
            activity
          });
          return activity;
        },

        _optionactivityname: async (list) => {
          let user = firebase.auth().currentUser
          var userid= user.uid;
          var date = moment().utcOffset('+02:00').format('DD-MM-YYYY');
          //let dates=[];
          firebase.database().ref('users/' + `${userid}`).child('optionactivity/').child('optionactivityname/').set({
            list,
            date
          });


        },


    _calloptionactivityname: async () => {
          let actlist;
          let user = firebase.auth().currentUser
          var userid= user.uid;
          firebase.database().ref('users/' + `${userid}`).child('optionactivity/').child('optionactivityname/').on('value', (snapshot) => {
            actlist = snapshot.val().list
          });
          return actlist
        },

        _callemotionhistory: async () => {
          let user = firebase.auth().currentUser
          var userid= user.uid;
          if(user){
            var ref = firebase.database().ref('users/' + `${userid}`).child('emo').child('videoEmo');
              return ref.once('value').then((snapshot) => {
            const chatObject = snapshot.val();


           let chatList = Object.keys(chatObject).map(key => ({
            ...chatObject[key],
          }));

             console.log(chatList.reverse());
             return chatList.reverse();

            }).catch(function(error) {
              console.log( error)
            })
          }
        },
    }

export default Firebase
