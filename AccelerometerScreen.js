import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import RNSensors from 'react-native-sensors';
const { Accelerometer, Gyroscope } = RNSensors;

class AccelerometerScreen extends Component {
  frameTime = 4;
  accObservable;
  constructor(props) {
    super(props);
    this.state = {
      accVal: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      },
      xAcc: 0,
      yAcc: 0,
      xVelocity: 0,
      yVelocity: 0,
      xPosition: 0,
      yPosition: 0,
    };
    xWidth = Dimensions.get('window').width;
    yWidth = Dimensions.get('window').height;
    new Accelerometer({
      updateInterval: 100,
    })
      .then(observable => {
        this.accObservable = observable;
        this.accObservable.subscribe(accVal => {
          this.setState({ accVal })
          xAcc = accVal.x;
          yAcc = accVal.y;

          this.setState({ xVelocity: xAcc * this.frameTime });
          this.setState({ yVelocity: yAcc * this.frameTime });

          xS = (this.state.xVelocity / 2) * this.frameTime;
          yS = (this.state.yVelocity / 2) * this.frameTime;

          this.setState({ xPosition: this.state.xPosition -= xS });
          this.setState({ yPosition: this.state.yPosition += yS });

          if (this.state.xPosition > (xWidth - 48)) {
            this.setState({ xPosition: xWidth - 48 });
          } else if (this.state.xPosition < 0) {
            this.setState({ xPosition: 0 });
          }
          if (this.state.yPosition > (400 - 48)) {
            this.setState({ yPosition: 400 - 48 });
          } else if (this.state.yPosition < 0) {
            this.setState({ yPosition: 0 });
          }
        });
      });
  }


  render() {
    return (
      <View style={styles.accContainer}>

        <Text style={styles.welcome}>
          xPos: {round(this.state.xPosition)}{"\n"} yPos: {round(this.state.yPosition)}{"\n"}

                        </Text>
        <View style={StyleSheet.flatten({ position: "absolute", left: this.state.xPosition, top: this.state.yPosition })}>
          <Image
            style={StyleSheet.flatten({ width: 48, height: 48 })}
            source={require('./bright-green.jpg')}
          />
        </View>
        <Text style={styles.container}>
          x {round(this.state.accVal.x)}{"\n"}
          y {round(this.state.accVal.y)}{"\n"}
          z {round(this.state.accVal.z)}
        </Text>

      </View>
    );
  }
}
export default AccelerometerScreen;

function round(n) {
  if (!n) {
    return 0;
  }
  console.log(n);
  return Math.floor(n * 100) / 100;
}
const styles = StyleSheet.create({
  accContainer: {
    alignSelf: 'stretch',
    height: 400,
},
container: {
  flex: 1,
  alignItems: 'center',
  marginTop: 50
},
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
});