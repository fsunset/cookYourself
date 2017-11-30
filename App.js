'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';

import './components/apiCredentials';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeUserScreen from './screens/HomeUserScreen';
import AccountScreen from './screens/AccountScreen'
import RecipeInfoScreen from './screens/RecipeInfoScreen'


const CookYourselfNavigation = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },
    HomeUser: {
        screen: HomeUserScreen
    },
    Account: {
      screen: AccountScreen
    },
    RecipeInfo: {
      screen: RecipeInfoScreen
    }
  },
  {
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <CookYourselfNavigation />;
  }
}
