import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Button } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code

class TextInputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  storeName = async () => {
    try {
      await AsyncStorage.setItem('Register:userName', this.state.text);
    } catch (error) {
    }
    Actions.NumberDate();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, color: 'white', height: 50, width: "50%", marginTop: 20, textAlign: this.props.center, fontSize: 20, marginBottom: 20 }}
          placeholder="Enter your name"
          onChangeText={(text) => this.setState({text})}
        />
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
        <Button
          onPress={() => { this.storeName() }}
          title="Save & Go to Next"
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