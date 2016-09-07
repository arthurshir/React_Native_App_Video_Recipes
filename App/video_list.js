'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
} = ReactNative;


var ListViewSimpleExample = React.createClass({
  statics: {
    title: '<ListView>',
    description: 'Performant, scrollable list of data.'
  },
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}/>
    );
  },
});

module.exports = ListViewSimpleExample;