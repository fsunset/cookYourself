'use strict';

import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    paddingBottom: 20
  },
  title: {
    color: 'white',
    fontFamily: 'roboto',
    fontSize: 30,
    paddingHorizontal: 10,
    lineHeight: 35
  },
  recipeTagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  recipeTags: {
    fontFamily: 'roboto',
    marginBottom: 10,
    marginRight: 10,
    padding: 4,
    color: 'white',
    backgroundColor: '#ea4e3c'
  }
});
