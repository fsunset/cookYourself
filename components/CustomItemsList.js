'use strict';

import React from 'react';
import { FlatList, AsyncStorage, View, ActivityIndicator } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements'

import styles from '../assets/styles/globals.js';
import itemsUserStyles from '../assets/styles/itemsUser.js';


export default class CustomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      loaded: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);

      this.setState({
        user: userData,
        data: [],
        error: null,
        refreshing: false
      });
    });
  }

  componentDidMount() {
    const url = "https://randomuser.me/api?results=1&gender=lego";

    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.results,
          error: response.error || null,
          loaded: true
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return(
      <List style={styles.list}>
        { this.state.loaded ?
          <FlatList
          data={this.state.data}
          renderItem={ ({item}) =>
            <Card
              style={itemsUserStyles.card}
              title='Organic Tomatoes'
              titleStyle={itemsUserStyles.title}
              image={{uri: 'http://thisisstory.com/wp-content/uploads/2017/05/tomatoes-intro-1-1.jpg'}}>
            </Card>
          }
          keyExtractor={item => item.email}
          />
          :
          <View style={styles.spinnerContainer}>
            <ActivityIndicator color="#ea4e3c" size={1} />
          </View>
        }
      </List>
    );
  }
}
