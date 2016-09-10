// example_index.ios.js

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var realm = require('./realm/datastore.js').realm;
var VideoService = require('./services/video_service.js');
var Dashboard = require('./App/video_list.js');

import React, { Component } from 'react';
import {
  AppRegistry,
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

class BasicListView extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })
    var videos = realm.objects('Video');
    this.state = {
      dataSource: ds.cloneWithRows(videos)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    var image_url = rowData.image_url + ".jpeg";
    console.log(image_url);
    return (
      <View style={{ height:60, width: 250}}>
        <View style={{ flex:1, flexDirection: 'row' }}>
          <View style= {{ flex: 2, backgroundColor: 'powderblue'}}>
           <Image source={{uri: image_url}}/>
          </View>
          <View style= {{ flex: 4, backgroundColor: 'powderblue'}}>
           <Text>test{rowData.description}</Text>
          </View>
        </View>
      </View>
    );
  }

          // <View style={{ flexDirection: 'row' }}>
        //   <View style={{ flex: 2 }}>
        //     <Text>test{rowData.description}</Text>
        //   </View>
        //   <View style={{ flex: 4 }}>
        //     <Text>test{rowData.description}</Text>
        //   </View>
        // </View>


  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}
              // <Image source={{uri=rowData.image_url}}/>


class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={{padding: 10}}>
      <TextInput
        style = {{height:38}}
        placeholder="Type here to translate"
        onChangeText={(text) => this.setState({text})} />
      <Text>{this.state.text.split(' ').map((word) => word && 'PIZZA').join(' ')}</Text>
      </View>
    );
  }
}

class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  };
  render() {
    // Put Changes desired to this Component here.
    // Every time a state change occurs, this will be called again
    let display = this.state.showText ? "Hello" + this.props.name + "!" : " ";
    return (
      <Text>{display}</Text>
    )
  }
}

class VideoRecipes extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
          <PizzaTranslator/>
        </View>
        <View style={{
          flex: 4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <BasicListView/>
        </View>
        <View style={{flex: 2, backgroundColor: 'powderblue'}}>
          <Text>Hello World!</Text>
          <Image source={pic} style={{width:193, height: 110}}/>
          <Greeting name='lilfukk' />
          <Greeting name='frddd' />
        </View>
      </View>
    );
  }
}

// var VideoRecipes = React.createClass({
//   render: function() {
//     return (
//       <NavigatorIOS
//         style={styles.container}
//         tintColor='#FF6600'
//         initialRoute={{
//           title: '30s Videos',
//           component: Dashboard,
//         }}/>
//     );
//   }
// });

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
