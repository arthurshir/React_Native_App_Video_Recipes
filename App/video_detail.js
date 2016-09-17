'use strict';
import realm from '../realm/datastore.js';
var VideoService = require('../services/video_service.js');
import ParsedText from 'react-native-parsed-text';
var Background = require('./background.js').sayagata;

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Dimensions,
  WebView,
  ListView,
  StyleSheet,
  Linking,
  TouchableHighlight,
  NavigatorIOS,
  ScrollView,
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

  _touchSaveButton(rowData) {
    realm.write(() => {
      this.props.video.favorited = !this.props.video.favorited;
    });
    this.forceUpdate();
  }

  _handleUrlPress(url) {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
 }

  render() {
    this.props.navigator.rightButtonTitle = 'Save',
    console.log(this.props.video.description);
    var width = Dimensions.get('window').width; //full width
    var height = Dimensions.get('window').height; //full width
    var savedBackgroundColor = this.props.video.favorited ? '#FF5E72' : '#C0C0C0';
    var savedText = this.props.video.favorited ? 'Saved ❤️' : 'Save 🍴'
    var hostPage = realm.objects('Page').filtered("fbid == '" + this.props.video.host_id + "'")[0];

    return (
      <Background style={{ flex: 1 }}>
        <ScrollView>
          <View style={{
            justifyContent: 'center',
          }}>
            <View style={{height: 80, alignItems: 'center', justifyContent: 'center'}}>
              <TouchableHighlight style={{paddingLeft:10, paddingRight:10, paddingTop:8, paddingBottom:8}} onPress={() => { Linking.openURL('https://www.facebook.com/' + hostPage.fbid).catch(err => console.error('An error occurred', err)); }} underlayColor="white">
                  <Text style={{fontSize:17, fontWeight:'bold', textDecorationLine:'underline'}}>{hostPage.name}</Text>
              </TouchableHighlight>
            </View>

            <WebView
              style={{height: width, backgroundColor: 'black' }}
              javaScriptEnabled={true}
              source={{uri: 'https://www.facebook.com/video/embed?video_id=' + this.props.video.fbid}}
            />
            <ParsedText
              style={{ padding: 20, textAlign:'center', fontSize:14}}
              parse={
                [
                  {type: 'url', style: {color: 'blue', textDecorationLine: 'underline' }, onPress: this._handleUrlPress},
                ]
              }
            >
              {this.props.video.description}
            </ParsedText>

            <TouchableHighlight onPress={() => { this._touchSaveButton() }} underlayColor="white">
              <View style={{height: 60, backgroundColor: savedBackgroundColor, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color:'white', fontSize:16}}>{savedText}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { Linking.openURL(this.props.video.page_url).catch(err => console.error('An error occurred', err)); }} underlayColor="white">
              <View style={{height: 60, backgroundColor: '#3b5998', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color:'white', fontSize:16}}>View on Facebook</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </Background>
    );
  }
}

// Text: "Strawberry Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}1 cup strawberries, chopped{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk, then whip until smooth.{"\n"}Fold in the strawberries.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with strawberries!{"\n"}{"\n"}Mango & Passionfruit Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}½ cup passionfruit juice{"\n"}1 cup mango, chopped{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and passionfruit juice, then whip until smooth.{"\n"}Fold in the mango.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with more mango!{"\n"}{"\n"}Toasted Coconut Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}1 cup coconut milk{"\n"}1 cup coconut flakes{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and coconut milk, then whip until smooth.{"\n"}In a pan over medium heat, toast the coconut until browned, stirring constantly.{"\n"}Fold the toasted coconut into the cream mixture.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve!{"\n"}{"\n"}Chocolate & Dulce de Leche Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}3 tablespoons cocoa powder{"\n"}1 cup dulce de leche{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and cocoa powder, then whip until smooth.{"\n"}Drizzle the dulce de leche on top.{"\n"}Carefully swirl in the dulce de leche, making sure it is not blended into the cream.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with more dulce de leche!"


module.exports = VideoDetailView;
