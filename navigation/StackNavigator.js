import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Profile from '../screens/Profile'
import EditAvatar from '../screens/EditAvatar'


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
