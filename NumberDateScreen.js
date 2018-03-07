import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, DatePickerAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class NumberDateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { number: 0 ,newDate: ''};
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
		  <Text>{this.state.number}</Text>
		  <Button
            onPress={this.openAndroidDatePicker}
            title="Continue"
            color="#1A237E"
            accessibilityLabel="Continue"
          />
		  <Text>{this.state.newDate}</Text>
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