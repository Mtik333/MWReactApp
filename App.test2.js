import React, { Component } from 'react'
import { AsyncStorage, Text, View, TextInput, StyleSheet, Button } from 'react-native'
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.27
import PresentationalComponent from './PresentationalComponent'

class AsyncStorageExample extends Component {
   static navigationOptions = {
     title: 'Welcome',
   };
   state = {
      name: 'nothing'
   }
   setName = (value) => {
      AsyncStorage.setItem('@MySuperStore:name', value);
      this.setState({ 'name': value });
   }
   render() {
	  const { navigate } = this.props.navigation;
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.textInput} autoCapitalize = 'none' 
               onChangeText = {this.setName}/>
            <Text>
               {this.state.name}
            </Text>
			<Button
			  onPress={() => { this.onPressLearnMore(navigate) }}
			  title="Continue"
			  color="#1A237E"
			  accessibilityLabel="Continue"
			/>
         </View>
      )
   }
   onPressLearnMore(navigated) {
	 navigated('Summary', { dane: 'Summary' });
   }
}

class Summary extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
      return (
         <View>
            <PresentationalComponent myState = {AsyncStorage.getItem('@MySuperStore:name')} />
         </View>
      )
   }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: AsyncStorageExample,
    },
	Summary: {
	  screen: Summary,
	},
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   textInput: {
      margin: 15,
      height: 35,
      borderWidth: 1,
      backgroundColor: '#7685ed'
   }
})

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}