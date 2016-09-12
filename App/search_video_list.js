
'use strict';
import realm from '../realm/datastore.js';
var VideoService = require('../services/video_service.js');
var VideoDetailView = require('./video_detail.js');
import { ListView } from 'realm/react-native';

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Dimensions,
  // ListView,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

class VideoListView extends Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var videos = realm.objects('Video');
    this.state = {
      dataSource: ds.cloneWithRows(videos)
    };
  }

  _refreshDatastore(contains) {
    var videos = realm.objects('Video');
    if (contains != "") {
      videos = videos.filtered("description CONTAINS[c] '" + contains + "'");
    }
    console.log("Updating Datastore with filter: " + contains + " resulting in video.length: " + videos.length);
    this.state = {
      dataSource: this.state.dataSource.cloneWithRows(videos)
    };
    // this.state.dataSource = this.state.dataSource.cloneWithRows(videos);
  }

  _onForward(rowData) {
    this.props.navigator.push({
      component: VideoDetailView,
      title: "",
      rightButtonTitle: 'Save ',
      onRightButtonPress: () => this._touchRightButton(rowData),
      passProps: { video: rowData }
    });
  }

  _touchRightButton(rowData) {
    realm.write(() => {
      var video = realm.objects('Video').filtered("fbid == '" + rowData.fbid + "'")[0];
      video.favorited = !video.favorited;
    });
  }


  _onBack() {
    // this.props.navigator.pop();
  }

  renderRow(rowData, sectionID, rowID) {
    var description = rowData.description;
    var description = description.split('\n')[0];
    var fbid = rowData.fbid;
    var image_url = rowData.image_url;
    var width = Dimensions.get('window').width; //full width
    return (
      <TouchableHighlight onPress={() => this._onForward(rowData)} underlayColor="white">
        <View style={{ height: 100, width: width }}>
          <View style={{ flex:1, flexDirection: 'row' }}>
            <View style= {{ flex: 2 }}>
             <Image source={{uri: image_url}} style={{ padding: 10, flex:1 }}/>
            </View>
            <View style= {{ flex: 4, justifyContent: 'center' }}>
             <Text style= {{ padding: 10 }}>{description}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onChangeText(text) {
    this._refreshDatastore(text);
  }

  _onSearchButtonPress(text) {
  }

  _onCancelButtonPress(rowData) {

  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'powderblue' }}>
        <View style={{height:62}}/>
        <TextInput
          style = {{height: 50}}
          placeholder="Search"
          onChangeText={(text) => this._onChangeText(text)}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this._renderSeparator}
          />
      </View>
    );
  }

  _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          paddingLeft: 20,
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#c8c7cc',
        }}
      />
    );
  }
}

module.exports = VideoListView;
