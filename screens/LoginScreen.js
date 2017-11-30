'use strict';

import React from 'react';
import Firebase from "../components/Firebase";
import { Text, View, ImageBackground, TextInput, TouchableHighlight, Alert, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../assets/styles/globals.js';
import stylesLogin from '../assets/styles/login.js';


export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    }
  }

  async loginUser() {
    Firebase.auth().signInWithEmailAndPassword((this.state.email).trim(), this.state.password)
      .then(
        (userData) => {
          this.setState({
            loaded: false
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
            email: '',
            password: ''
          });

          Alert.alert('Login Failed. \n' + error.toString());
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
          <Text style={styles.title}>Go to Your Kitchen</Text>
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
            onPress={this.loginUser.bind(this)}
            underlayColor='#ea4e3c'
            activeOpacity={1}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Log In</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => navigate('Register')}
            underlayColor='transparent'
            activeOpacity={1}
          >
            <Text style={styles.link}>I'm a New Chef!</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

// *** White Logo ***
//<Image
//  source={require('../assets/images/public/logo-white.png')}
//  style={styles.logo}
//></Image>
//
// *** Social Buttons ***
//<Icon.Button
//   name="google"
//   onPress={() => {Alert.alert('You tapped Google btn')}}
//   style={stylesLogin.btnGoogle}
//   backgroundColor="transparent"
//   paddingLeft={27}
//   paddingRight={27}
//   paddingTop={15}
//   paddingBottom={15}
//   size={25}
//   borderRadius={0}
// >
//   Log in with Google
// </Icon.Button>
// <Icon.Button
//   name="facebook"
//   onPress={() => {Alert.alert('You tapped Facebook btn')}}
//   style={stylesLogin.btnFacebook}
//   backgroundColor="transparent"
//   paddingLeft={20}
//   paddingRight={20}
//   paddingTop={15}
//   paddingBottom={15}
//   size={30}
//   borderRadius={0}
// >
//   Log in with Facebook
// </Icon.Button>
