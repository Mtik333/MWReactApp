import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Button, Switch } from 'react-native';
import AppDB from '../AppDB';
let appDB = new AppDB();

class QueryDatabase extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    
    }

    handleSwitch = (value) => {
        this.setState({ switch: value });
      }

    renderRow(arg) {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text>{arg}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch' }}>
                    <TextInput
                    //style={{ borderColor: 'gray', borderWidth: 1, color: 'white', height: 50, width: "50%", marginTop: 20, textAlign: this.props.center, fontSize: 20, marginBottom: 20 }}
                    placeholder="Enter your name"
                    //onChangeText={(text) => this.setState({text})}
                    />
                </View>
            </View>
        );
    }


    render() {
        const data=["prop1","prop2"];
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
            data.map((datum) => {
                return this.renderRow(datum);
            })
        }
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

export default QueryDatabase;