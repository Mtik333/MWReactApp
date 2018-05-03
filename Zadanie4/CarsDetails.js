import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView,TextInput, AsyncStorage, Image, Button } from 'react-native';


class CarsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        text: '',
        car: ''
    };
  }

  componentWillMount() {
    var car = this.props.navigation.state.params['car'];
    this.setState({car: car});
}

  render() {
    return (
      <View style={styles.container}>
      <ScrollView ref="scrollView">
        <Image
          source={{uri: this.state.car.pictureUrl}}
          style={styles.image}
          resizeMode={'contain'} 
        />
        <Text>Model: {this.state.car.model}</Text>
        <Text>Manufacturer: {this.state.car.manufacturer}</Text>
        <Text>Year: {new Date(this.state.car.year).getFullYear().toString()}</Text>
        <View>
        <Button
          style={styles.button}
          title="Return to filtering"
          theme='dark'
          backgroundColor="#767653"
          accessibilityLabel="Return"
        />
        </View>
      </ScrollView>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  button: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    width: 50
  },
  image:{
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: win.width,
    height: win.height/2,
  }
});

export default CarsDetails;