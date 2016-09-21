
'use strict';
import realm from '../realm/datastore.js';
var VideoService = require('../services/video_service.js');
var VideoDetailView = require('./video_detail.js');
var methods = require('../methods.js');
var Background = require('./background.js').sayagata;
// import { ListView } from 'realm/react-native';

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

var videoArray = [];

var width = Dimensions.get('window').width; //full width
const styles = StyleSheet.create({
    floatView: {
        flex: 1,
        position: 'absolute',
        height: 36,
        width: width / 2 - 14,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.55)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameText: {
      color: 'white',
      padding: 5,
      fontSize: 10,
    }
});

class VideoListView extends Component {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true });
    videoArray = realm.objects('Video');
    var rowLength = videoArray.length == 0 ? 0 : Math.ceil(videoArray.length/2);
    console.log(rowLength);
    this.state = {
      dataSource: ds.cloneWithRows( Array.apply(null, Array(rowLength)).map(function(x,i) {return i}) )
    };
  }

  _refreshDatastore(contains) {
    videoArray = realm.objects('Video');
    if (contains != "") {
      videoArray = videoArray.filtered("name CONTAINS[c] '" + contains + "'");
    }
    console.log("Updating to " + videoArray.length + " videos for filter: " + contains);
    var rowLength = videoArray.length == 0 ? 0 : Math.ceil(videoArray.length/2);
    this.state = {
      dataSource: this.state.dataSource.cloneWithRows( Array.apply(null, Array(rowLength)).map(function(x,i) {return i}) )
    };
    this.forceUpdate();
  }

  _onForward(itemData) {
    this.props.navigator.push({
      component: VideoDetailView,
      title: "",
      passProps: { video: itemData }
    });
  }


  _onBack() {
    // this.props.navigator.pop();
  }

  renderRow(rowData, sectionID, rowID) {
    // console.log("rowData: " + rowData);
    var video0 = videoArray[rowData*2];
    var video1 = videoArray[rowData*2 + 1];
    var width = Dimensions.get('window').width; //full width

    // Optional Column 1
    var column0 = (typeof video0 !== "undefined") ?
    <TouchableHighlight style={{flex: 1, height: width / 2 - 10 }}  onPress={() => this._onForward(video0)} underlayColor="white">
      <View style={{ flex:1, flexDirection: 'row' }}>
        <View style= {{ flex: 1, padding: 5, paddingLeft:10 }}>
           <View style={{flex: 1, borderRadius:5, overflow: 'hidden' }}>
             <Image source={{uri: video0.image_url}} style={{ flex:1 }}>
               <View style={styles.floatView}>
                 <Text style={styles.nameText} numberOfLines={2}>{video0.name}</Text>
               </View>
             </Image>
           </View>
        </View>
      </View>
    </TouchableHighlight> : <View style={{flex: 1, height: width / 2 - 10}}/>;

    // Optional Column 2
    var column1 = (typeof video1 !== "undefined") ?
    <TouchableHighlight style={{flex: 1, height: width / 2 - 10 }}  onPress={() => this._onForward(video1)} underlayColor="white">
      <View style={{ flex: 1 }}>
        <View style= {{ flex: 1, padding: 5, paddingRight:10 }}>
          <View style={{flex: 1, borderRadius:5, overflow: 'hidden' }}>
             <Image source={{uri: video1.image_url}} style={{ flex:1 }}>
               <View style={styles.floatView}>
                 <Text style={styles.nameText} numberOfLines={2}>{video1.name}</Text>
               </View>
             </Image>
          </View>
        </View>
      </View>
    </TouchableHighlight> : <View style={{flex: 1, height: width / 2 - 10}}/>;

    return (
      <View style={{ flex:1, flexDirection: 'row' }}>
        { column0 }
        { column1 }
      </View>
    );
  }

  _onSubmitEditing() {
    console.log(this.state.inputtedText);
    this._refreshDatastore(this.state.inputtedText);
  }

  _onSearchButtonPress(text) {
  }

  _onCancelButtonPress(itemData) {

  }

  render() {
    return (
      <Background>
        <View style={{height:62}}/>
        <TextInput
          style = {{ paddingLeft: 10, paddingRight: 10, height: 48, color: 'black', backgroundColor: 'rgba(236,236,236,0.65)'}}
          placeholderTextColor='#525252'
          placeholder="Search"
          returnKeyType = "search"
          onSubmitEditing={() => this._onSubmitEditing()}
          onChangeText={(text) => { this.setState({inputtedText:text}); }}
        />
        <ListView
          style={{flex:1}}
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

module.exports = VideoListView;
