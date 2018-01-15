'use strict';

import React from 'react';
import { Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList, TouchableHighlight, Linking } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../assets/styles/globals';
import recipeStyles from '../assets/styles/recipe';
import itemsUserStyles from '../assets/styles/itemsUser.js';

export default class RecipeInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentWillMount() {
    const url = global.apiUrl + 'recipe/' + this.props.navigation.state.params.recipeId + '?api_key=' + global.apiKey;
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
          data: response,
          loaded: true
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/user/recipe-bg.jpg')}
        style={styles.baseContainer}
      >
        <StatusBar barStyle="light-content" />

        <View style={styles.fullHeightContainer}>
          { this.state.loaded ?
            <List containerStyle={styles.list}>
              <Tile
                imageSrc={{uri: this.state.data.ImageUrl}}
                title={this.state.data.Title}
                titleStyle={recipeStyles.recipeTitle}
                caption={ this.state.data.YieldNumber + ' serves'}
                captionStyle={recipeStyles.recipeCaption}
                featured
                activeOpacity={1}
              />

              {this.state.data.Cuisine != null &&
                <View style={[itemsUserStyles.recipeTagsContainer]}>
                  <Text
                    style={itemsUserStyles.recipeTags}
                  >
                    {this.state.data.Cuisine + ' Cuisine'}
                  </Text>
                </View>
              }
              {this.state.data.TotalMinutes > 0 &&
              <View style={[itemsUserStyles.recipeTagsContainer]}>
                <Text
                  style={itemsUserStyles.recipeTags}
                >
                  {this.state.data.TotalMinutes + ' Minutes'}
                </Text>
              </View>
              }

              <View style={recipeStyles.recipeHeaderContainer}>
                <Text style={[styles.link, styles.linkLarge, recipeStyles.recipeHeader]}>Ingredients</Text>
                <Icon
                  name="heart"
                  size={24}
                  color="lightgrey"
                />
              </View>

              <FlatList
                data={this.state.data.Ingredients}
                renderItem={ ({item}) =>
                  (
                    <ListItem
                      key={item.IngredientID}
                      style={recipeStyles.ingredientRow}
                      title={item.Name}
                      titleNumberOfLines={5}
                      titleStyle={recipeStyles.recipeIngredients}
                      hideChevron
                      leftIcon={{name: 'toll'}}
                    />
                  )
                }
                keyExtractor={item => item.IngredientID}
              />

              <View style={recipeStyles.recipeHeaderContainer}>
                <Text style={[styles.link, styles.linkLarge, recipeStyles.recipeHeader]}>Instructions</Text>
                <Text>{this.state.data.Instructions}</Text>
              </View>
            </List>
            :
            <View style={styles.spinnerContainer}>
              <ActivityIndicator color="#ea4e3c" size={1} />
            </View>
          }
        </View>
      </ImageBackground>
    );
  }
}
