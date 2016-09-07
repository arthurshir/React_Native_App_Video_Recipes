/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var realm = require('./realm/datastore.js').realm;
var VideoService = require('./services/video_service.js');
var Dashboard = require('./App/video_list.js');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View
} from 'react-native';

// VideoService.fetchPages();
// VideoService.fetchVideos();

var VideoRecipes = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          title: '30s Videos',
          component: Dashboard,
        }}/>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('VideoRecipes', () => VideoRecipes);
