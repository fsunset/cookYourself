'use strict';

import React, {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  // Base Styling
  baseContainer: {
    alignItems: 'center',
    backgroundColor:'black',
    flex: 1,
    height: null,
    justifyContent: 'center',
    width: null
  },
  backgroundImage: {
    alignItems: 'center',
    backgroundColor:'transparent',
    flex: 1,
    height: null,
    justifyContent: 'center',
    width: null
  },
  logo: {
    height: 230,
    width: 230,
    marginBottom: 25
  },
  link: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 20,
    fontSize: 19,
    fontFamily: 'roboto',
  },
  linkLarge: {
    fontFamily: 'belinda',
    fontSize: 35,
    marginTop: 40,
    paddingHorizontal: 5
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 30,
    width: '100%',
  },
  centered: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  body: {
    flex: 6,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 10,
    width: '100%',
    justifyContent: 'center',
  },
  fullHeightContainer: {
    flex: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    fontFamily: 'belinda',
    fontSize: 40,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  list: {
    width: '100%',
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
  },

  // Form Styling
  textInput: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#fff',
    padding: 10,
    paddingBottom: 1,
    marginTop: 10,
    fontFamily: 'roboto',
    fontSize: 16
  },
  primaryButton: {
    marginTop: 60,
    marginBottom: 5,
    padding: 15,
    backgroundColor: '#ea4e3c',
    width: '100%',
    alignItems: 'center'
  },
  primaryButtonText: {
    color: '#fff',
    fontFamily: 'roboto',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
