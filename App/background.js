import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
} from 'react-native';

// https://stackoverflow.com/questions/38107439/how-can-i-repeat-a-pattern-image-to-create-a-background-in-react-native
var RepeatImage = React.createClass({
    render: function(){
    var images = [],
    imgWidth = 500,
    winWidth = Dimensions.get('window').height;

    for(var i=0;i<Math.ceil(winWidth / imgWidth);i++){
        images.push((
           <Image source={require('../images/sayagata.png')} key={i}/>
        ))
    }

    return (
        <View style={{flex:1,flexDirection:'column'}}>
        {
         images.map(function(img,i){
         return img;
         })
        }
          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'transparent'}}>
            {this.props.children}
          </View>
        </View>
    )
  }
});

var RepeatImage2 = React.createClass({
    render: function(){
    var images = [],
    imgWidth = 500,
    winWidth = Dimensions.get('window').height;

    for(var i=0;i<Math.ceil(winWidth / imgWidth);i++){
        images.push((
           <Image source={require('../images/upfeathers.png')} key={i}/>
        ))
    }

    return (
        <View style={{flex:1,flexDirection:'column'}}>
        {
         images.map(function(img,i){
         return img;
         })
        }
          <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'transparent'}}>
            {this.props.children}
          </View>
        </View>
    )
  }
});

module.exports = {
  "sayagata": RepeatImage,
  "upfeathers": RepeatImage2,
}
