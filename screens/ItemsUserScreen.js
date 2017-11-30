'use strict';

import React from 'react';
import { Text, View, ImageBackground, StatusBar } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomItemsList from '../components/CustomItemsList';

import styles from '../assets/styles/globals';

export default class ItemsUserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Cupboard',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="shopping-basket"
        size={20}
        style={{color: tintColor}}
      />
    ),
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require('../assets/images/user/recipe-bg.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Your Cupboard</Text>

          <Text style={styles.primaryButtonText}>
            <Icon
              onPress={() => navigate('Account')}
              name="plus-square"
              size={24}
              color="#ea4e3c"
            />
          </Text>
        </View>

        <View style={[styles.body, styles.container]}>
          <CustomItemsList />
        </View>
      </ImageBackground>
    );
  }
}
