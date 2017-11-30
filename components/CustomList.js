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
        error: null,
        refreshing: false
      });
    });
  }

  componentDidMount() {
    const url = global.apiUrl + '?q=chicken&app_id=' + global.appId + '&app_key=' + global.appKey + '&from=0&to=20';
    // const url = 'http://api.campbellskitchen.com/brandservice.svc/api/search?ingredient=beef&format=json&app_id=daf820f6&app_key=e3ee4684e1a79ffa2515d8b8286fc6d9&total=20';

    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.hits,
          error: response.error || false,
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
              <TouchableHighlight
                onPress={
                  () => this.props.navigation.navigate('RecipeInfo', {'uri': item.recipe.uri})
                }
              >
                <View>
                  <Card
                    style={itemsUserStyles.card}
                    title={item.recipe.label}
                    titleStyle={itemsUserStyles.title}
                    image={{uri: item.recipe.image}}
                  >
                    <View style={[itemsUserStyles.recipeTagsContainer]}>
                      {
                        (item.recipe.dietLabels.concat(item.recipe.healthLabels)).map((tag, i) => {
                          return (
                            <Text
                              key={i}
                              style={itemsUserStyles.recipeTags}
                            >
                              {tag}
                            </Text>
                          )
                        })
                      }
                    </View>
                  </Card>
                </View>
              </TouchableHighlight>
            }
            keyExtractor={item => item.recipe.uri}
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
