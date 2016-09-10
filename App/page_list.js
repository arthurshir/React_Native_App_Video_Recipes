
'use strict';
import realm from '../realm/datastore.js';
var VideoService = require('../services/video_service.js');
var VideoListView = require('./video_list.js');

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
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

class PageListView extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
    this._onBack = this._onBack.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    console.log(realm);
    console.log(realm.objects('Page'));
    var pages = realm.objects('Page');
    this.state = {
      dataSource: ds.cloneWithRows(pages)
    };
  }

  _onForward(rowData) {
    this.props.navigator.push({
      component: VideoListView,
      title: rowData.name,
      passProps: { pageid: rowData.fbid }
    });
  }

  _onBack() {
    this.props.navigator.pop();
  }

  renderRow(rowData, sectionID, rowID) {
    var name = rowData.name;
    var fbid = rowData.fbid;
    var image_url = rowData.image_url;
    var width = Dimensions.get('window').width; //full width
    console.log(image_url);
    return (
      <TouchableHighlight onPress={() => this._onForward(rowData)} underlayColor="white">
        <Image style={{ height: 140, width: width }} source={{uri: image_url}}/>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

module.exports = PageListView;
