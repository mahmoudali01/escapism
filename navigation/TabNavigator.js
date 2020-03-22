import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { MaterialCommunityIcons } from 'react-native-vector-icons';
 import {  ProfileNavigator } from './StackNavigator'
import Chatbot from '../screens/Chatbot';
import MTracker from '../screens/MTracker';
import Status from '../screens/Status';
import Recommend from '../screens/Recommend';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Chatbot,
      navigationOptions: {
          title: 'Escapism',
          tabBarLabel:'Escapism' ,
          tabBarIcon: ({ color , size }) => (
          <MaterialCommunityIcons name="doctor" color={color} size={25} />

        )
      }
    },
    Recommend: {
      screen: Recommend,
      navigationOptions: {
        title: 'Recommend',
        tabBarLabel:'Recommend' ,

        tabBarIcon: ({ color , size }) => (
        <MaterialCommunityIcons name="bell" color={color} size={25} />
        )
      }
    },
    MTracker: {
      screen: MTracker,
      navigationOptions: {
        title: 'MTracker',
        tabBarLabel:'MTracker' ,

        tabBarIcon: ({ color , size }) => (
        <MaterialCommunityIcons name="details" color={color} size={25} />

      )
      }
    },
    Status: {
      screen: Status,
      navigationOptions: {
        title: 'Status',
        tabBarLabel:'Status' ,

        tabBarIcon: ({ color , size }) => (
        <MaterialCommunityIcons name="account-tie" color={color} size={25} />

      )

      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel:'Profile' ,

        tabBarIcon: ({ color , size }) => (
        <MaterialCommunityIcons name="account" color={color} size={25} />

      )
      }
    }
  },
  {
    initialRouteName: 'Home',

    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#e91e63',

    }
  }
)

export default createAppContainer(TabNavigator)
