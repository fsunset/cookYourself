'use strict';

import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  recipeTitle: {
    color: '#fff',
    fontFamily: 'roboto',
    fontSize: 30,
    lineHeight: 33
  },
  recipeCaption: {
    color: '#fff',
    fontFamily: 'roboto',
    fontSize: 22
  },
  recipeIngredients: {
    color: '#fff',
    fontFamily: 'roboto',
    fontSize: 16
  },
  recipeHeader: {
    padding: 20,
    marginTop: 0
  },
  ingredientRow: {
    borderBottomWidth: 0,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: 'transparent'
  },
  recipeHeaderContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    paddingHorizontal: 10,
    width: '100%'
  }
});
