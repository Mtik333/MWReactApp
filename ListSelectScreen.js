import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
  Alert
} from 'react-native';

class ListSelectScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      newDate: '',
      myData: [
        { key: 1, title: "One" },
        { key: 2, title: "Two" },
        { key: 3, title: "Three" },
        { key: 4, title: "Four" },
        { key: 5, title: "Five" },
        { key: 6, title: "Six" },
        { key: 7, title: "Seven" },
        { key: 8, title: "Eight" },
        { key: 9, title: "Nine" },
        { key: 10, title: "Ten" },
        { key: 11, title: "Eleven" },
        { key: 12, title: "Twelve" },
        { key: 13, title: "Thirteen" },
        { key: 14, title: "Fourteen" },
        { key: 15, title: "Fifteen" },
        { key: 16, title: "Sixteen" },
      ]
    };
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }
  getItem = (item) => {
    Alert.alert(item.title);
    console.log(item.title);
    this.setState({ selected: item.title })
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <Text
          style={styles.welcome}
        >
          ListSelectScreen
       </Text>
       <Text style={{ color: "#000", textAlign: this.props.center }}>You chosen: {this.state.selected}</Text>
        <FlatList
          data={this.state.myData}
          ItemSeparatorComponent = {this.flatListItemSeparator}
          renderItem={({ item }) =>
            <Text style={styles.item} onPress={this.getItem.bind(this, item)}> {item.key}|{item.title}
            </Text>}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#000055',
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default ListSelectScreen;