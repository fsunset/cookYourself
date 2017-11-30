'use strict';

import React from 'react';
import Firebase from "../components/Firebase";
import { NavigationActions } from 'react-navigation';
import { Text, View, ImageBackground, TextInput, TouchableHighlight, Alert, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';

import styles from '../assets/styles/globals.js';


export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  async registrateUser() {
    this.setState({
      loaded: false
    });

    Firebase.auth().createUserWithEmailAndPassword((this.state.email).trim(), this.state.password)
      .then(
        (userData) => {
          this.setState({
            loaded: true,
            email: ''
          });

          // Save User Data Object
          AsyncStorage.setItem('userData', JSON.stringify(userData));

          // Go to User Home Page
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'HomeUser'})
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }
      )
      .catch(
        (error) => {
          this.setState({
            loaded: true,
            password: ''
          });

          Alert.alert('Register Failed. \n' + error.toString());
        }
      );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require('../assets/images/public/bg.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>New Chef</Text>
          { !this.state.loaded &&
            <View style={styles.spinnerContainer}>
              <ActivityIndicator size={1} />
            </View>
          }
        </View>
        <View style={styles.body}>
          <TextInput
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
            style={styles.textInput}
            placeholderTextColor={"white"}
            underlineColorAndroid={"transparent"}
          />
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
            style={styles.textInput}
            placeholderTextColor={"white"}
            underlineColorAndroid={"transparent"}
          />

          <TouchableHighlight
            onPress={this.registrateUser.bind(this)}
            style={styles.primaryButton}
            underlayColor='#ea4e3c'
            activeOpacity={1}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => navigate('Login')}
            underlayColor='transparent'
            activeOpacity={1}
          >
            <Text style={styles.link}>Go to My Kitchen!</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
