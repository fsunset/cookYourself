'use strict';

import React from 'react';
import { Text, View, ImageBackground, AsyncStorage, StatusBar, ActivityIndicator } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import CustomList from '../components/CustomList';
import ItemsUserScreen from './ItemsUserScreen';
import RecipesUserScreen from './RecipesUserScreen';

import styles from '../assets/styles/globals.js';


class HomeUserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Kitchen',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="cutlery"
        size={20}
        style={{color: tintColor}}
      />
    )
  };

  componentWillMount() {
    AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);

      this.setState({
        user: userData
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require('../assets/images/user/recipe-bg.jpg')}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Your Kitchen</Text>

          <Text style={styles.primaryButtonText}>
            <Icon
              onPress={() => navigate('Account')}
              name="cog"
              size={24}
              color="#ea4e3c"
            />
          </Text>
        </View>

        <View style={[styles.body, styles.container]}>
          <CustomList navigation={this.props.navigation} />
        </View>
      </ImageBackground>
    );
  }
}

const CookYourselfTabNavigation = TabNavigator(
  {
    HomeUser: {
      screen: HomeUserScreen,
    },
    ItemsUser: {
      screen: ItemsUserScreen,
    },
    RecipesUser: {
      screen: RecipesUserScreen,
    },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: "#ea4e3c",
      inactiveTintColor: "#a0a0a0",
      labelStyle: {
        fontSize: 12,
      },
      iconStyle: {
        marginTop: -5,
        marginBottom: -6
      },
      style: {
        backgroundColor: '#f7f7f7',
        maxHeight: 50
      },
      // Android Styling
      renderIndicator: () => null,
      showIcon: true,
      allowFontScaling: false,
    }
  }
);

export default CookYourselfTabNavigation;
