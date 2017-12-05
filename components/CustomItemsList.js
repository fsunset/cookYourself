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
      <List containerStyle={styles.list}>
        { this.state.loaded ?
          <FlatList
          data={this.state.data}
          renderItem={ ({item}) =>
          <View>
              <Card
                containerStyle={itemsUserStyles.card}
                title='Vegetables'
                titleStyle={itemsUserStyles.title}
                image={{uri: 'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}}>
              </Card>
              <Card
                containerStyle={itemsUserStyles.card}
                title='Fruits'
                titleStyle={itemsUserStyles.title}
                image={{uri: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}}>
              </Card>
              <Card
                containerStyle={itemsUserStyles.card}
                title='Cereals'
                titleStyle={itemsUserStyles.title}
                image={{uri: 'https://images.unsplash.com/photo-1482834990796-28374fb4409f?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}}>
              </Card>
              <Card
                containerStyle={itemsUserStyles.card}
                title='Meats'
                titleStyle={itemsUserStyles.title}
                image={{uri: 'https://images.unsplash.com/photo-1471128239556-6ea9c69e8674?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D'}}>
              </Card>
            </View>
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
