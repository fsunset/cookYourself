'use strict';

import React from 'react';
import { Text, Image, ImageBackground, TouchableHighlight, AsyncStorage, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from '../assets/styles/globals.js';


export default class HomeScreen extends React.Component {
  componentWillMount() {
    AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);

      if (userData != null) {;
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'HomeUser'})
          ]
        });
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require('../assets/images/public/bg.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />

        <Image
          source={require('../assets/images/public/logo-white.png')}
          style={styles.logo}
        ></Image>

        <TouchableHighlight
          onPress={() => navigate('Register')}
          underlayColor='transparent'
          activeOpacity={1}
        >
          <Text style={[styles.link, styles.linkLarge]}>Brand New Chef</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => navigate('Login')}
          underlayColor='transparent'
          activeOpacity={1}
        >
          <Text style={[styles.link, styles.linkLarge]}>Go to My Kitchen!</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}
