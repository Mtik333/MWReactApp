import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import RNSimpleCompass from 'react-native-simple-compass';
const degree_update_rate = 1;

class MagnetometerScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      degre: 0,
    }

    RNSimpleCompass.start(degree_update_rate, (degree) => {
      this.setState({degre:degree});
      console.log(this.state.degre);
      console.log(degree);
    });
  }
  render() {

    return (
      <View style={styles.sensor}>
        <Image
          style={StyleSheet.flatten({ width: 192, height: 192, transform: [{ rotate: this.state.degre + "deg" }] })}
          source={require('./compass_rose.png')}
        />
      </View>
    );
  }
}
export default MagnetometerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

