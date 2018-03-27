import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Permissions from 'react-native-permissions';

class GPSScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullGps: null,
      latitude: null,
      longitude: null,
      error: null,
      locationPermission: '',
    };
  }

  componentDidMount() {
    Permissions.check('location').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ locationPermission: response });
      console.log(locationPermission);
    });

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.fullGps}</Text>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}
export default GPSScreen;

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   }
})