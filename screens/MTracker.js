import React, {Component} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity ,Alert } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
//import { isThisWeek } from 'date-fns';
console.disableYellowBox=true;

class MTracker extends Component{

  constructor(props){
    super(props);

    this.state = {
      initialArr: [],
      status: false,
      pickactive: null,
    }
 }

  SampleFunction=(item)=>{
    this.state.pickactive = item
    this.props.navigation.navigate('Activityoption')
  }

  _senditem = async () => {
    return this.state.pickactive
  }

  _show = async () => {
    this.state.initialArr = await this.props.firebase._showdata()
    this.setState({
      status:!this.state.status
    });
  }

    render(){

      var SampleNameArray = this.state.initialArr
        return (
          <View style={styles.MainContainer}>
              <TouchableOpacity onPress={this._show}>
                  <Text>Select Activities</Text>
              </TouchableOpacity>
              { this.state.status && SampleNameArray.map((item, key)=>(
              <Text key={key} style={styles.TextStyle} onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
              )}

          </View>
          );
}
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    margin: 10

  },

  TextStyle:{
    fontSize : 25,
     textAlign: 'center'
  }

 });


export default withFirebaseHOC(MTracker);
