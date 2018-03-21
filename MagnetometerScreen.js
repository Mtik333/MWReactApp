import React, { Component } from 'react';
import {
  Magnetometer,
} from 'expo';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';


class MagnetometerScreen extends Component {
  state = {
    MagnetometerData: {},
  }

  
  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Magnetometer.setUpdateInterval(1000);
  }

  _fast = () => {
    Magnetometer.setUpdateInterval(16);
  }

  _subscribe = () => {
      console.log('aaa');
    this._subscription = Magnetometer.addListener((result) => {
      this.setState({MagnetometerData: result});
      console.log(result);
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  test = () => {
      let { x, y, z } = this.state.MagnetometerData;
      console.log(this.state.MagnetometerData.x);
      console.log(Math.atan2(this.state.MagnetometerData.y, this.state.MagnetometerData.x));
  }
  
  render() {
    let { x, y, z } = this.state.MagnetometerData;

    return (
      <View style={styles.sensor}>
        <Text>Magnetometer:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
        <Text>{Math.atan2(y, x) * (180 / Math.PI)}</Text>
        <Text>{(Math.atan2(y, x)+(4+(26/60)/(180/Math.PI))) * (180 / Math.PI)}</Text>
        <Text>{90 - Math.atan2(x, y) * (180 / Math.PI)}</Text>
        <Text>{270 - Math.atan2(x, y) * (180 / Math.PI)}</Text>
      </View>
    );
  }
}
export default MagnetometerScreen;
function round(n) {
  if (!n) {
    return 0;
  }
  console.log(n);
  return Math.floor(n * 100) / 100;
}

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
    paddingHorizontal: 10,
  },
});

