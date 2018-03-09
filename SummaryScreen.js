import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class SummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 'false',
    };
  }
  registerData = {
    userName: "Tu",
    date: "10/04/2010",
    updateDate: false,
    selectedItem: '',
  };
  loadAsync = async () => {
    this.registerData.userName = await AsyncStorage.getItem('Register:userName');
    this.registerData.date = await AsyncStorage.getItem('Register:date');
    this.registerData.updateDate = await AsyncStorage.getItem('Register:updateDate');
    this.registerData.selectedItem = await AsyncStorage.getItem('Register:selectedItem');
  
    try {
      if (this.selectedItem !== null) {
        this.setState({ loaded: 'true' });
      }
    } catch (error) {
    }
  }
  render(){
    (async () => {
      await this.loadAsync();
    })();
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
        >
          SummaryScreen
        </Text>
        <Text>Summary</Text>
          <Text>You are: {this.registerData.userName}</Text>
          <Text>Selected date: {this.registerData.date}</Text>
          <Text>Auto update date form server?: {this.registerData.updateDate}</Text>
          <Text>Selected country: {this.registerData.selectedItem}</Text>
          <Button
          onPress={() => { Actions.Text() }}
          title="Go to Text Screen"
          color="#1A237E"
          accessibilityLabel="Continue"
        />
        <Button
          onPress={() => { Actions.NumberDate() }}
          title="Go to Number & Date Screen"
          color="#1A237E"
          accessibilityLabel="Continue"
        />
        <Button
          onPress={() => { Actions.List() }}
          title="Go to List Screen"
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aa00aa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default SummaryScreen;