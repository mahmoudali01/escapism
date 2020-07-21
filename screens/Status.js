import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,Dimensions,FlatList,ScrollView } from 'react-native';
import moment from "moment";
import { withFirebaseHOC } from '../config/Firebase'
import axios from "axios"
import { ListItem } from 'react-native-elements'

console.disableYellowBox=true;

  class Status extends Component{


    state = {
    //  userStatus: [],
      statusEmo:null
    };

    componentDidMount() {
       //this.fetchStatusChat(),
       this.fetchStatusEmo()
     };


    // fetchStatusChat = async () => {
    //   try {
    //        var userStatus = await this.props.firebase.fetchStatusChat();
    //        this.setState({ userStatus })
    //     //   console.log('USER status ===========>>', userStatus)
    //      } catch (error) {
    //     console.log(error)
    //    }
    // };
    fetchStatusEmo = async () => {
      try {
           var statusEmo = await this.props.firebase.fetchStatusEmo();
           this.setState({ statusEmo })
        //   console.log('status Emoooooo ===========>>', statusEmo)
         } catch (error) {
        console.log(error)
       }
    };


    // handlecopyChatNavigation = () => {
    //   this.props.navigation.navigate('copyChat' ,{date: this.state.statusEmo.date})
    // };


    render(){
      const {  statusEmo } = this.state

      const list = statusEmo;
       return (
         <ScrollView>

 <View>
  {
    list.map((l, i) => (
      <TouchableOpacity
      // onPress={this.handlecopyChatNavigation}
      //onPress={this.handlecopyChatNavigation}
      onPress={() => {
    this.props.navigation.navigate('copyChat',{date:l.date});
   }}
      >
     <ListItem
       containerStyle={styles.container}
       key={i}
       title={l.date}
       subtitle={l.emo}
       bottomDivider
     />
     </TouchableOpacity>
   ))

  }
</View>
 </ScrollView>

        );
   }
  }

  Status.navigationOptions = {
  headerTitle: 'Status'
};

const styles = StyleSheet.create({
container:{
  marginTop:Dimensions.get('window').height > 500 ? 20 : 10,
  backgroundColor: "white",
  height:100,
  flexDirection: 'row',
  marginBottom:20,
  width:380,
  borderRadius:20,
  marginLeft: 20,
  paddingLeft: 10,


},
card:{

   fontSize:30,
  }

});

export default withFirebaseHOC(Status);
