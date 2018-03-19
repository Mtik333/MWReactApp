import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch, DatePickerAndroid,AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class NumberDateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { number: 0 , switch: true, newDate: ''};
  }
  handleSwitch = (value) => {
    this.setState({ switch: value });
    (async () => {
      await this.storeSwitch(value);
    })();
  }
  storeSwitch = async (value) => {
    try {
      console.log(this.switch);
      await AsyncStorage.setItem('Register:updateDate', value.toString());
    } catch (error) {
    }
  }
  storeName = async () => {
    try {
      await AsyncStorage.setItem('Register:date', this.state.newDate);
    } catch (error) {
    }
  }
  openAndroidDatePicker = async () => {
  try {
	var newState = {};
    const {action, year, month, day} = await DatePickerAndroid.open({
      date: new Date()
    });
	if(action == DatePickerAndroid.dateSetAction){
	    var date = new Date(year, month, day);
      console.log(year + ' ' + month + ' ' + day);
	    console.log(date.toLocaleDateString());
	    this.setState({
        newDate: date.toLocaleDateString()
      });
      (async () => {
        await this.storeName();
      })();
    }
  } catch ({code, message}) {
    console.warn('Cannot open date picker', message);
  }
}
  
  render(){
	  return (
		<View style={styles.container}>
      <View style={{flex: 1, marginTop: 20}}>
		  <Button
            onPress={this.openAndroidDatePicker}
            title="Pick date"
            color="#1A237E"
            accessibilityLabel="Continue"
          />
          </View>
      <Text style={{ color: 'white', fontSize: 20, marginTop: 15, textAlign: this.props.center }}>Are you a robot?</Text>
      <Switch
          style={{ margin: 10}}
          onValueChange={this.handleSwitch}
          value={this.state.switch} />
      <Text style={{ color: 'white', fontSize: 20, marginTop: 15, textAlign: this.props.center }}>{this.state.switch.toString()}</Text>
      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
      <Button
          onPress={() => { Actions.List() }}
          theme='dark'
          backgroundColor="#767653"
          title="Save & Go to Next"
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00aa00',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default NumberDateScreen;