import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Profile from '../screens/Profile'
import EditAvatar from '../screens/EditAvatar'
import Chatbot from '../screens/Chatbot';
import MTracker from '../screens/MTracker';
import Status from '../screens/Status';
// import Recommend from '../screens/Recommend';
import MyCam  from '../screens/camera';
import Activityoption  from '../screens/Activityoption';
//import Activity  from '../screens/Activity';
import Conversation from '../screens/copyChat';
import Select_activity  from '../screens/Select_activity';
//import Delete_activity  from '../screens/Delete_activity';
//import Moodchartvoften  from '../screens/Moodchartvoften';


export const HomeNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Chatbot
    },
    Camera: {
      screen: MyCam
    },

  })
)

export const StatusNavigator = createAppContainer(
  createStackNavigator({
    Status: {
      screen: Status
    },
    Conversation: {
      screen: Conversation
    },

  })
)

// export const RecommendNavigator = createAppContainer(
//   createStackNavigator({
//     Recommendations: {
//       screen: Recommend
//     },
//
//   })
// )

export const TrackerNavigator = createAppContainer(
  createStackNavigator({
    moodTracker: {
      screen: MTracker
    },
    Select_activity:{
      screen: Select_activity
    },
    // Delete_activity:{
    //   screen: Delete_activity
    // },
    Activityoption: {
      screen: Activityoption
    },
    // Moodchartvoften: {
    //   screen: Moodchartvoften
    // },

  })
)
export const ProfileNavigator = createAppContainer(
  createStackNavigator({
    Profile: {
      screen: Profile
    },
    EditAvatar: {
      screen: EditAvatar
    }
  })
)
