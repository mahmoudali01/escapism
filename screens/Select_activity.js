import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import { ButtonGroup } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import moment from 'moment';


class Select_activity extends Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: [],
      activelist: [],
      isDialogVisible: false,
      time: '',
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    console.log(selectedIndex)
  }

  async componentDidMount() {
    this.state.activelist = await this.props.firebase._callactivityname();
    console.log(this.state.activelist)
      //Getting the current date-time with required formate and UTC   
      var date = moment()
        .utcOffset('+02:00')
        .format('YYYY-MM-DD');
    
      this.setState({ time: date });
      console.log(this.state.time)
      //Settign up time to show
  }

  /*componentDidMount() {
    this.fetchactivities();
  }

  fetchactivities = async () => {
    //this.state.activelist = await this.props.firebase._callactivityname();
    var activelist = await this.props.firebase._callactivityname();
          this.setState({ activelist })
          console.log('USER DETAILS ===========>>', activelist)

  }*/

  addNewActivity = async (newActivity) => {
    const f=true;
    for(let i=0;i<this.state.activelist.length;i++)
    {
      if(this.state.activelist[i]==newActivity)
      {
        f=false;
      }
    }
    if(newActivity=='' && f){
      Alert.alert("Please write new activity");
    }
    else
    {
      let list = await this.props.firebase._addnewactivityname(this.state.activelist, newActivity);
      this.setState({activelist : list});
      this.setState({selectedIndex: []});
    }
    

  }
  
  showDialog(isShow){
    this.setState({isDialogVisible: isShow});
  }

  _deleteActivity = async () => {
    const selected = this.state.selectedIndex;
    const active = this.state.activelist;
    for (let i=0;i<=selected.length;i++)
    {
      for(let j=0;j<=active.length;j++)
      {
        if(j==selected[i])
        {
          active[j]=null;
        }
      }
    }
    var temp = [];

    for(let i of this.state.activelist)
        i && temp.push(i);

    this.state.activelist = temp;
    //console.log(this.state.activelist)
    let list = this.state.activelist
    if(this.state.activelist.length>0){
    await this.props.firebase._deleteactivityname(list)
    }
    else{
      Alert.alert("Please select activities");
    }
    this.setState({activelist : list});
  }

  _activeOption = async () => {

    const selected = this.state.selectedIndex;
    const active = this.state.activelist;
    const newactive = [];
    for (let i=0, k=0;i<=selected.length;i++, k++)
    {
      for(let j=0;j<=active.length;j++)
      {
        if(j==selected[i])
        {
          newactive[k] = active[j];
        }
      }
    }
    this.state.activelist = newactive;
    var temp = [];
    //console.log(this.state.selectedIndex)
    for(let i of this.state.activelist)
        i && temp.push(i);

    this.state.activelist = temp;
    console.log(this.state.activelist)
    //let list = this.state.activelist
    if(this.state.activelist.length==1){
    await this.props.firebase._optionactivityname(this.state.activelist)
    this.props.navigation.navigate('Activityoption')
    }
    else{
      Alert.alert("Please select one activity");
    }
    let list = await this.props.firebase.__callactivityname();
    this.setState({activelist: list});
  }


  render() {
    const buttons = ['Hello', 'World', 'Buttons']
    const { activelist } = this.state
    const { selectedIndex } = this.state
  return (
    <View>
    <ButtonGroup
      onPress={this.updateIndex}
      selectedIndexes={selectedIndex}
      buttons={activelist}
      selectMultiple={true}
      isFLoat={true}
      containerStyle={{height: 70, marginTop: 30, width: "100%"}}
      innerBorderStyle={{width: 10}}

      
      
    />
    <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={"New Activity"}
            hintInput ={"Write Activity"}
            submitInput={ (inputText) => {this.addNewActivity(inputText)} }
            closeDialog={ () => {this.showDialog(false)}}>
    </DialogInput>

    <TouchableOpacity onPress={()=>{this.showDialog(true)}} style={{padding:10}}>
          <Text style={{ textAlign: "center" }}>Add New Activity</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={this._deleteActivity}
      style={{padding:10}}
    >
      <Text style={{ textAlign: "center" }}>delete activity</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={this._activeOption}
      style={{padding:10}}
    >
      <Text style={{ textAlign: "center" }}>Done</Text>
    </TouchableOpacity>

    </View>
  );
  }
}

export default withFirebaseHOC(Select_activity);
