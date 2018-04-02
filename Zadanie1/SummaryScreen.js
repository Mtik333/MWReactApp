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
  render() {
    (async () => {
      await this.loadAsync();
    })();
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
        >
          Summary
        </Text>
        <Text style={styles.textStyle}>Hello {this.registerData.userName}</Text>
        <Text style={styles.textStyle}>Picked date: {this.registerData.date}</Text>
        <Text style={styles.textStyle}>Are you a robot?: {this.registerData.updateDate}</Text>
        <Text style={styles.textStyle}>Selected number: {this.registerData.selectedItem}</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingTop: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: '#ffffff', textAlign: "center", flex: 1, flexWrap: 'wrap'}}>Want to change name?</Text>
          <Button
            onPress={() => { Actions.Text() }}
            title="Go to Text Screen"
            theme='dark'
          backgroundColor="#767653"
            accessibilityLabel="Continue"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingTop: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: '#ffffff', textAlign: "center", flex: 1, flexWrap: 'wrap'}}>Want to change date?</Text>
          <Button
          onPress={() => { Actions.NumberDate() }}
          title="Go to Date Screen"
          theme='dark'
          backgroundColor="#767653"
          accessibilityLabel="Continue"
        />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingTop: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: '#ffffff', textAlign: "center", flex: 1, flexWrap: 'wrap'}}>Want to change number?</Text>
          <Button
          onPress={() => { Actions.List() }}
          title="Go to List Screen"
          theme='dark'
          backgroundColor="#767653"
          accessibilityLabel="Continue"
        />
        </View>
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
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
  },
});

export default SummaryScreen;