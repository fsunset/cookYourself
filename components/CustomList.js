'use strict';

import React from 'react';
import { FlatList, AsyncStorage, View, Text, ActivityIndicator, TouchableHighlight } from 'react-native';
import { List, ListItem, Card, PricingCard } from 'react-native-elements'
import { NavigationActions } from 'react-navigation';

import styles from '../assets/styles/globals.js';
import itemsUserStyles from '../assets/styles/itemsUser.js';


export default class CustomList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false,
      loaded: false,
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('userData').then((userDataJson) => {
      let userData = JSON.parse(userDataJson);

      this.setState({
        user: userData,
        data: [],
        refreshing: false
      });
    });
  }

  componentDidMount() {
    const url = global.apiUrl + 'recipes?photos=true&rpp=20&pg=1' + '&api_key=' + global.apiKey + '&include_ing=mustard,chicken,beef';

    fetch(url, {
      method: 'GET',
      cache: 'default',
      headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8'
        }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.Results,
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
              <TouchableHighlight
                onPress={
                  () => this.props.navigation.navigate('RecipeInfo', {'recipeId': item.RecipeID})
                }
              >
                <View>
                  <Card
                    containerStyle={itemsUserStyles.card}
                    title={item.Title}
                    titleStyle={itemsUserStyles.title}
                    image={{uri: item.PhotoUrl}}
                  >
                    <View style={[itemsUserStyles.recipeTagsContainer]}>
                      <Text
                        style={itemsUserStyles.recipeTags}
                      >
                        {item.Category}
                      </Text>
                    </View>
                    <View style={[itemsUserStyles.recipeTagsContainer]}>
                      <Text
                        key={item.RecipeID}
                        style={itemsUserStyles.recipeTags}
                      >
                        Review Count: {item.ReviewCount}
                      </Text>
                    </View>
                    <View style={[itemsUserStyles.recipeTagsContainer]}>
                      <Text
                        key={item.RecipeID}
                        style={itemsUserStyles.recipeTags}
                      >
                        Star Rating: {item.StarRating}
                      </Text>
                    </View>
                  </Card>
                </View>
              </TouchableHighlight>
            }
            keyExtractor={item => item.RecipeID}
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
