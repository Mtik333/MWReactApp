import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Switch,
  Alert,
  AsyncStorage,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import App from './App';

class ListSelectScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myItem: '',
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
      ],
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
  storeListElem = async (item) => {
    try {
      await AsyncStorage.setItem('Register:selectedItem', item.title);
    } catch (error) {
    }
  }
  render() {
    const textColor = this.props.selected ? "red" : "black";
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
            <TouchableOpacity 
            style={[styles.touchStyle]}
            onPress={this.storeListElem.bind(this,item) }
            >
              <Text style={styles.item}> {item.key}|{item.title}
            </Text>
              </TouchableOpacity > }
        />
        <Button
          onPress={() => { Actions.Summary() }}
          title="Save & Go to Summary"
          color="#1A237E"
          accessibilityLabel="Continue"
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
    height: 44
  },
  touchStyle: {
    alignItems: 'flex-start',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});

export default ListSelectScreen;