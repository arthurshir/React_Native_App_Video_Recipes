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
  }

  render() {
    return (
      <Background>
        <View style={styles.textContainer}>
          <Text style={styles.centeredHeader}>Video Recipes V1.0</Text>
          <View style={{height:8}}/>
          <Text style={styles.body}>• New Facebook videos are added to this app daily at 12 am Pacific time</Text>
          <Text style={styles.body}>• Videos Included from these accounts: Buzzfeed Tasty, Buzzfeed Proper Tasty, Mr. Cooking Panda, TabiEats, Tastemade, and The Buddhist Chef</Text>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    flex: 1,
    justifyContent:'center',
    padding: 10,
  },
  centeredContainer:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
  },
  floatView: {
    flex: 1,
    position: 'absolute',
    height: 36,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredHeader: {
    alignSelf:'center',
    fontSize:18,
  },
  body: {
    padding: 6,
  },
});

// Text: "Strawberry Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}1 cup strawberries, chopped{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk, then whip until smooth.{"\n"}Fold in the strawberries.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with strawberries!{"\n"}{"\n"}Mango & Passionfruit Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}½ cup passionfruit juice{"\n"}1 cup mango, chopped{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and passionfruit juice, then whip until smooth.{"\n"}Fold in the mango.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with more mango!{"\n"}{"\n"}Toasted Coconut Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}1 cup coconut milk{"\n"}1 cup coconut flakes{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and coconut milk, then whip until smooth.{"\n"}In a pan over medium heat, toast the coconut until browned, stirring constantly.{"\n"}Fold the toasted coconut into the cream mixture.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve!{"\n"}{"\n"}Chocolate & Dulce de Leche Ice Cream{"\n"}Servings: 4-5{"\n"}{"\n"}INGREDIENTS{"\n"}2 cups heavy cream, chilled{"\n"}1 can sweetened condensed milk{"\n"}3 tablespoons cocoa powder{"\n"}1 cup dulce de leche{"\n"}{"\n"}PREPARATION{"\n"}In a large bowl, whip the cream until soft peaks form.{"\n"}Add the condensed milk and cocoa powder, then whip until smooth.{"\n"}Drizzle the dulce de leche on top.{"\n"}Carefully swirl in the dulce de leche, making sure it is not blended into the cream.{"\n"}Transfer the mixture to a baking pan or bowl, then freeze.{"\n"}Serve with more dulce de leche!"


module.exports = VideoDetailView;
