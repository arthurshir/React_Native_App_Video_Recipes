
'use strict';
import realm from '../realm/datastore.js';
var VideoService = require('../services/video_service.js');
var VideoDetailView = require('./video_detail.js');
var Background = require('./background.js').sayagata;
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

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true });
    var videos = realm.objects('Video').filtered("favorited == true ");
    this.state = {
      dataSource: ds.cloneWithRows(videos)
    };
  }

  componentDidMount() {
      var currentRoute = this.props.navigator.navigationContext.currentRoute;
      this.props.navigator.navigationContext.addListener('didfocus', (event) => {
          if (currentRoute === event.data.route) {
            // View Did Appear
              console.log("View Did Appear")
              // this.forceUpdate();
          } else {
            // View Did Disappear
          }
       });
  }

  _refreshDatastore() {
    var videos = realm.objects('Video').filtered("favorited == true ");
    this.state = {
      dataSource: this.state.dataSource.cloneWithRows(videos)
    };
  }

  _onForward(rowData) {
    this.props.navigator.push({
      component: VideoDetailView,
      title: "",
      passProps: { video: rowData }
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
        <View style={{ height: 110, width: width }}>
          <View style={{ flex:1, flexDirection: 'row' }}>
            <View style= {{ flex: 3, padding: 5, paddingLeft:10 }}>
              <View style={{flex: 1, borderRadius:5, overflow: 'hidden' }}>
                <Image source={{uri: image_url}} style={{ flex:1}}/>
              </View>
            </View>
            <View style= {{ flex: 4, justifyContent: 'center' }}>
             <Text style= {{ padding: 10 }} numberOfLines={3}>{description}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    this._refreshDatastore();
    return (
      <Background >
        <ListView
          style={styles.clearBackground}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderFooter={() => <View style={{height:10}}/>}
          renderHeader={() => <View style={{height:10}}/>}
          />
      </Background>
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

const styles = StyleSheet.create({
  clearBackground: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});


module.exports = VideoListView;
