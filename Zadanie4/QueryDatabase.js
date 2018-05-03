import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Button, Switch } from 'react-native';
import AppDB from '../AppDB';
let appDB = new AppDB();

class QueryDatabase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            filter: { model: '', manufacturer: '', year: '' },
            items: appDB._getAll()
        };
    }

    setFilterValue(arg, text) {
        this.state.filter[arg] = text;
    }

    componentDidMount() {
        console.log(this.state.items);
    }

    filterResults = () => {
        myFilter = this.state.filter;
        this.props.navigation.navigate('CarsList', { myFilter });
    }


    renderRow(arg) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.filter} >
                    <Text>{arg.charAt(0).toUpperCase() + arg.slice(1)}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, height: 50 }}>
                    {arg=='year' &&
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setFilterValue(arg, text)}
                            placeholder="Value" />
                    }
                    {arg!='year' &&
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setFilterValue(arg, text)}
                            placeholder="Value" />
                    }
                </View>
            </View>
        );
    }


    render() {
        const data = ["manufacturer", "model", "year"];
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <View style={styles.input}>
                    {
                        data.map((datum) => {
                            return this.renderRow(datum);
                        })
                    }
                </View>
                <View style={styles.filter}>
                    <Button
                        onPress={() => { this.filterResults() }}
                        title="Filter"
                        theme='dark'
                        backgroundColor="#767653"
                        accessibilityLabel="Filter"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        //flexDirection: 'row',
        // height: 50,
        width: "100%",
        // textAlign: 'left'
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        margin: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
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
    button: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        width: 50
    },
});

export default QueryDatabase;