import React, { Component } from 'react'
import { View ,Button, Alert, FlatList} from 'react-native'
import { Text } from 'react-native-ui-kitten'
import { withFirebaseHOC } from '../config/Firebase'
import { GiftedChat  } from 'react-native-gifted-chat';
console.disableYellowBox=true;

class copyChat extends Component {
  state = {
 
    messages: [],
    userDetails: [],
  };

  componentDidMount(){
    this.fetchUserChat();
  }

  fetchUserChat = async () => {
    try {
         var messages = await this.props.firebase.fetchChat();
         this.setState({ messages});
         console.log("gonna test here");
         //console.log( messages[0].text)
       } catch (error) {
      console.log(error)
    } 
    };
   
     
  render(){
    const { userDetails , messages } = this.state
    
    return (
      <View style={{ flex: 1, backgroundColor: '#FBF0D2' }}>
         <GiftedChat 
          isTyping = {false}
            messages={this.state.messages}
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

export default withFirebaseHOC(copyChat)
