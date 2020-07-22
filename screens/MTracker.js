import React, { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity ,Alert, Button,ScrollView,Dimensions, AppRegistry,Platform } from 'react-native';
import { withFirebaseHOC } from '../config/Firebase';
import RNPickerSelect from 'react-native-picker-select';
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import FusionCharts from 'react-native-fusioncharts';
import { Asset } from 'expo-asset';


console.disableYellowBox=true;


  class MTracker extends Component{

    

    async componentDidMount() {
    
       //const activelist = await this.props.firebase._callactivityname();
       this.state.emotionhistory = await this.props.firebase._callemotionhistory();
    }

    _AddENtry = async () => {

      this.props.navigation.navigate('Select_activity')

    }

    render(){
      const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 },
      ];
      

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: '#FBF0D2' }}>
              <ScrollView>
              <TouchableOpacity
                onPress={this._AddENtry}
                style={{
                  padding: 20,
                  width: "30%",
                  backgroundColor: "#fff"
                }}
              >
                <Text style={{ textAlign: "center" }}>Add Today's Entry</Text>
              </TouchableOpacity>
              <Text>Mood Chart</Text>
              
              <VictoryChart>
                <VictoryBar data={data} x="quarter" y="earnings" />
              </VictoryChart>
              
              <View style={styles.boxContainer}>
              
              </View>
              
              </ScrollView>
            </View>
          );
}
}

const styles = StyleSheet.create({
  boxContainer:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height:200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

MTracker.navigationOptions = {
  headerTitle: 'Recommend'
};

export default withFirebaseHOC(MTracker);
