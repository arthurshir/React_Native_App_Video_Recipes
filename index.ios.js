/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var realm = require('./realm/datastore.js');
var VideoService = require('./services/video_service.js');
var Dashboard = require('./App/video_list.js');
var FavoritesListView = require('./App/favorites_video_list.js');
var SearchListView = require('./App/search_video_list.js');
var PageListView = require('./App/page_list.js');

import React, { Component } from 'react';
import {
  AppRegistry,
  TabBarIOS,
  StatusBar,
  Dimensions,
  ListView,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

// VideoService.fetchPages();
// VideoService.fetchVideos();



class VideoRecipes extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'pages'
    };
  }

  render() {
    StatusBar.backgroundColor="#004699";
    return (
      <TabBarIOS
        barTintColor='#004699'
        tintColor="white"
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          title = "Pages"
          icon={require('./images/pages.png')}
          selected={this.state.selectedTab === 'pages'}
          onPress={() => {
            this.setState({
              selectedTab: 'pages',
            });
          }}>
          <NavigatorIOS
            initialRoute={{
              component: PageListView,
              title: 'Pages',
              navigationBarHidden: true
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title = "Search"
            icon={require('./images/search.png')}
            selected={this.state.selectedTab === 'search'}
            onPress={() => {
              this.setState({
                selectedTab: 'search',
              });
            }}>
            <NavigatorIOS
              style = {styles.container}
              initialRoute = {{
                title: 'Search All Recipes',
                component: SearchListView,
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title = "Favorites"
            icon={require('./images/saved.png')}
            selected={this.state.selectedTab === 'saved'}
            onPress={() => {
              this.setState({
                selectedTab: 'saved',
              });
            }}>
            <NavigatorIOS
              initialRoute = {{
                title: 'Favorites',
                component: FavoritesListView,
                navigationBarHidden: false
              }}
              style={{flex: 1}}
            />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}



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
