
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

    this._refreshDatastore();
  }

  _refreshDatastore() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    var videos = realm.objects('Video').filtered("favorited == true ");
    this.state = {
      dataSource: ds.cloneWithRows(videos)
    };
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
    console.log(image_url);
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

  render() {
    this._refreshDatastore();
    return (
      <View style={{flex: 1, backgroundColor: 'powderblue' }}>
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
