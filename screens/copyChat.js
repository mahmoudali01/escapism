import React, { Component } from 'react'
import { View ,Button, Alert, FlatList} from 'react-native'
import { Text } from 'react-native-ui-kitten'
import { withFirebaseHOC } from '../config/Firebase'
import { GiftedChat  } from 'react-native-gifted-chat';
console.disableYellowBox=true;

class Conversation extends Component {
  state = {

   statusChat: [],
   userDetails: [],

  };

  componentDidMount(){
    this.fetchStatusChat();
  }

  fetchStatusChat = async () => {
    try {
       var date =  this.props.navigation.state.params.date;
       console.log("status Chat Date---------->>",date)

         var statusChat = await this.props.firebase.fetchStatusChat(date);
         this.setState({ statusChat});
         console.log(statusChat)
       } catch (error) {
      console.log(error)
    }
    };


  render(){
    const { statusChat, userDetails  } = this.state

    return (
      <View style={{ flex: 1 ,backgroundColor: '#fffaf0'}}>
         <GiftedChat
            showUserAvatar = 'true'
            isTyping = {false}
            messages={this.state.statusChat}
            minComposerHeight={0}
            maxComposerHeight={0}
            minInputToolbarHeight={0}
            renderInputToolbar={() => null}
              user={{
              _id: 1,
              createdAt: new Date(),
              name: userDetails[0],
              email:  userDetails[1],
              avatar: userDetails[2],
              id:  userDetails[3],
            }}
            renderActions={this.renderCustomActions}
            />
        </View>
      );
}
}

export default withFirebaseHOC(Conversation)
