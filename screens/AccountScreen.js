'use strict';

import React from 'react';
import { Text, View, Image, ImageBackground, TouchableHighlight, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';

import styles from '../assets/styles/globals.js';
import accountStyles from '../assets/styles/account.js';


export default class AccountScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);

      this.setState({
        user: userData,
        userEmail: (userData.email).split('@'),
        loaded: true
      });
    });
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/user/recipe-bg.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />

        <View style={[styles.header, styles.centered]}>
            { !this.state.loaded &&
              <View style={styles.spinnerContainer}>
                <ActivityIndicator size={1} />
              </View>
            }
            { this.state.user &&
              <Text style={styles.title}>{this.state.userEmail[0]}</Text>
            }
        </View>

        { this.state.user &&
          <View style={styles.body}>
            <UserAvatar size="200" style={accountStyles.userAvatar} name={this.state.userEmail[0]} color='#ea4e3c'/>

            <Text style={accountStyles.listItem}>Francisco Barahona Sarmiento</Text>
            <Text style={accountStyles.listItem}>{this.state.user.email}</Text>

            <TouchableHighlight
              onPress={this.logout.bind(this)}
              underlayColor='transparent'
              activeOpacity={1}
            >
              <Text style={accountStyles.listItem}>Sign Out</Text>
            </TouchableHighlight>
          </View>
        }
      </ImageBackground>
    );
  }

  logout() {
    AsyncStorage.removeItem('userData').then(() => {
      // Go to Login Page
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login'})
        ]
      });
      this.props.navigation.dispatch(resetAction);
    });
  }
}
