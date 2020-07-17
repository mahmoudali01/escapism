import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,Dimensions,FlatList} from 'react-native';
import moment from "moment";
import { withFirebaseHOC } from '../config/Firebase'
import axios from "axios"

console.disableYellowBox=true;
  class Status extends Component{
   state={
    emo:""
   }
  componentDidMount(){
      this.fetchUseremo();
    }
    
   fetchUseremo = async () => {
     try {
         var emo = await this.props.firebase.fetchemo();
         this.setState({emo});
         console.log("gonna emo here");
         console.log(emo);
         //console.log( messages[0].text)
       } catch (error) {
      console.log(error)
    } 
     };

    handlecopyChatNavigation = () => {
      this.props.navigation.navigate('copyChat' ,{Status: this})
    }
    render(){
      
       return (
          <View style={{ backgroundColor: '#FBF0D2',height :1000}}>
              <Text>{this.state.emo}</Text>
            <View style={Styles.container}  >
          
            <TouchableOpacity
                  onPress={this.handlecopyChatNavigation}
                  >
                  <Text>chat</Text>
                  
                  </TouchableOpacity>
                  
            </View>
            </View>
   );
   }  
  }

  Status.navigationOptions = {
  headerTitle: 'Status'
};

const Styles= StyleSheet.create({
container:{
  marginTop:Dimensions.get('window').height > 600 ? 20 : 10,
  backgroundColor: "#FFF",
  height:150,
  flexDirection: 'row',
  marginBottom:20,
  width:370,
  borderRadius:10,
  marginLeft: 10
},
card:{

   fontSize:30,
  }
  
});

export default withFirebaseHOC(Status);