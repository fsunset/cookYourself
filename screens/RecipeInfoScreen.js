'use strict';

import React from 'react';
import { Text, View, ImageBackground, StatusBar, ActivityIndicator, FlatList, TouchableHighlight, Linking } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../assets/styles/globals';
import recipeStyles from '../assets/styles/recipe';

export default class RecipeInfoScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentWillMount() {
    const url = global.apiUrl + '?r=' + encodeURIComponent(this.props.navigation.state.params.uri) + '&app_id=' + global.appId + '&app_key=' + global.appKey;

    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response,
          error: response.error || null,
          loaded: true
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loaded: true
        });
      });
  }

  goToLink(recipeUrl) {
    Linking.openURL(recipeUrl)
      .catch(err => console.error(err));
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
                imageSrc={{uri: this.state.data[0].image}}
                title={this.state.data[0].label}
                titleStyle={recipeStyles.recipeTitle}
                caption={this.state.data[0].yield + ' serves'}
                captionStyle={recipeStyles.recipeCaption}
                featured
                activeOpacity={1}
              />

              <View style={recipeStyles.recipeHeaderContainer}>
                <Text style={[styles.link, styles.linkLarge, recipeStyles.recipeHeader]}>Ingredients</Text>
                <Icon
                  name="heart"
                  size={24}
                  color="lightgrey"
                />
              </View>

              <FlatList
                data={this.state.data[0].ingredients}
                renderItem={ ({item}) =>
                  (
                    <ListItem
                      key={item.weight + Math.random()}
                      style={recipeStyles.ingredientRow}
                      title={item.text}
                      titleNumberOfLines={5}
                      titleStyle={recipeStyles.recipeIngredients}
                      hideChevron
                      leftIcon={{name: 'toll'}}
                    />
                  )
                }
                keyExtractor={item => item.weight + Math.random()}
              />

              <TouchableHighlight
                onPress={() => this.goToLink(this.state.data[0].url)}
                underlayColor='#ea4e3c'
                activeOpacity={1}
                style={[styles.primaryButton, {marginTop: 5}]}
              >
                <Text style={styles.primaryButtonText}>View Full Recipe</Text>
              </TouchableHighlight>
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
