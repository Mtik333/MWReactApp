import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class TextInputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  
  render(){
	  return (
		<View style={styles.container}>
		  <Text
			style={styles.welcome}
			onPress={() => Actions.numberDate()} // New Code
		  >
			TextInputScreen
		  </Text>
		  <TextInput
		    style={{ color: "#000", height: 50, width: "50%", textAlign: this.props.center }}
			placeholder="Name"
			onChangeText={(text) => this.setState({text})}
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
    backgroundColor: '#bb0000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default TextInputScreen;