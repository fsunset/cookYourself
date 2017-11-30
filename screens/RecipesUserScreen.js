'use strict';

import React from 'react';
import { Text, ImageBackground, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomList from '../components/CustomList';

import styles from '../assets/styles/globals';

export default class RecipesUserScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Favs',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="heart"
        size={21}
        style={{color: tintColor}}
      />
    ),
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/user/recipe-bg.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Fav Recipes</Text>
        </View>

        <View style={[styles.body, styles.container]}>
          <CustomList />
        </View>
      </ImageBackground>
    );
  }
}
