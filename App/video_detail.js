'use strict';
import realm from '../realm/datastore.js';
var VideoService = require('../services/video_service.js');

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  AppRegistry,
  Dimensions,
  WebView,
  ListView,
  StyleSheet,
  TouchableHighlight,
  NavigatorIOS,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';


class VideoDetailView extends Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab: 'pages'
    };
  }

  render() {
    this.props.navigator.rightButtonTitle = 'Save',
    console.log(this.props.video.description.split('\n')[0]);
    var width = Dimensions.get('window').width; //full width
    var _scrollView: ScrollView;
    return (
      <View style={{flex: 1}}>
        <View style={{height:62}}/>
        <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            onScroll={() => { console.log('onScroll!'); }}
            scrollEventThrottle={200}
            style={{
              backgroundColor: '#6A85B1',
              height: 300,
            }}
        >
          <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft:10, paddingRight:10, backgroundColor: 'powderblue', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ textAlign:'center', fontSize:20 }}>{this.props.video.description.split('\n')[0]}</Text>
          </View>
          <View style={{ }}>
            <View style={{ height: 300 }}>
              <WebView
                style={{flex:1, backgroundColor: 'black' }}
                javaScriptEnabled={true}
                source={{uri: 'https://www.facebook.com/video/embed?video_id=' + this.props.video.fbid}}
              />
            </View>
            <View style={{ backgroundColor: 'powderblue' }}>
              <Text style={{ paddingTop: 10, paddingBottom: 0, textAlign:'center', fontSize:20 }}>Recipe</Text>
              <Text style={{ padding: 10}}>
              </Text>
            </View>
          </View>
          <View style={{height:49}}/>
        </ScrollView>
        <View style={{height:49}}/>
      </View>
    );
  }
}

// Text: "Strawberry Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}1 cup strawberries, chopped{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk, then whip until smooth.{"\n"}Fold in the strawberries.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with strawberries!{"\n"}{"\n"}Mango & Passionfruit Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}½ cup passionfruit juice{"\n"}1 cup mango, chopped{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and passionfruit juice, then whip until smooth.{"\n"}Fold in the mango.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with more mango!{"\n"}{"\n"}Toasted Coconut Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}1 cup coconut milk{"\n"}1 cup coconut flakes{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and coconut milk, then whip until smooth.{"\n"}In a pan over medium heat, toast the coconut until browned, stirring constantly.{"\n"}Fold the toasted coconut into the cream mixture.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve!{"\n"}{"\n"}Chocolate & Dulce de Leche Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}3 tablespoons cocoa powder{"\n"}1 cup dulce de leche{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and cocoa powder, then whip until smooth.{"\n"}Drizzle the dulce de leche on top.{"\n"}Carefully swirl in the dulce de leche, making sure it is not blended into the cream.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with more dulce de leche!"


module.exports = VideoDetailView;
