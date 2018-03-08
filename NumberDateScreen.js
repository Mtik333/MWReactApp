import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch, DatePickerAndroid,AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class NumberDateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { number: 0 ,switch: false,newDate: ''};
  }
  handleSwitch = (value) => {
    this.setState({ switch: value });
    (async () => {
      await this.storeSwitch();
    })();
  }
  storeSwitch = async () => {
    try {
      await AsyncStorage.setItem('Register:updateDate', this.state.switch.toString());
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
		  <Text
			style={styles.welcome}
		  >
			NumberDateScreen
		  </Text>
		  <TextInput
		    style={{ color: "#000", height: 50, width: "50%", textAlign: this.props.center }}
			keyboardType='numeric'
			placeholder="Favourite number"
			onChangeText={(number) => this.setState({number})}
		  />
		  <Text>Your number is: {this.state.number}</Text>
		  <Button
            onPress={this.openAndroidDatePicker}
            title="Continue"
            color="#1A237E"
            accessibilityLabel="Continue"
          />
		  <Text>Your date is: {this.state.newDate}</Text>
      <Switch
          style={{ alignContent: 'flex-start', margin: 100 }}
          onValueChange={this.handleSwitch}
          value={this.state.switch} />
          <Text style={{ color: "#000", textAlign: this.props.center }}>{this.state.switch.toString()}</Text>
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