import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TextInput, AsyncStorage, Image, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

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
        this.setState({ car: car });
    }

    returnToBase = () => {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'QueryDatabase' })
                    ]
                }));
    }

    renderRow(arg) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }} >
                    <Text style={styles.lefttext}>{arg.charAt(0).toUpperCase() + arg.slice(1)}:</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                    <Text style={styles.lowertext}>{this.state.car[arg].toString()}</Text>
                </View>
            </View>
        );
    }

    render() {
        const data = ["model", "manufacturer", "year"];
        return (
            <View style={styles.container}>
                <ScrollView ref="scrollView">
                    <Image
                        source={{ uri: this.state.car.pictureUrl }}
                        style={styles.image}
                        resizeMode={'contain'}
                    />
                    <Text style={styles.maintext}>Car details:</Text>
                    <View style={styles.input}>
                        {
                            data.map((datum) => {
                                return this.renderRow(datum);
                            })
                        }
                    </View>
                </ScrollView>
                <View style={{padding: 20}}>
                    <Button
                        onPress={() => { this.returnToBase() }}
                        style={styles.button}
                        title="Return to filtering"
                        theme='dark'
                        backgroundColor="#767653"
                        accessibilityLabel="Return"
                    />
                </View>
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
        padding: 10,
        margin: 20,
        width: 50
    },
    image: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        width: win.width,
        height: win.height / 2,
    },
    maintext: {
        margin: 5,
        fontSize: 20,
        padding: 5,
        fontWeight: 'bold'
    },
    lefttext: {
        padding: 10,
        color: "#C63B52",
        backgroundColor: '#F3E8E8'
    },
    lowertext: {
        padding: 10,
        color: "#3C23A1",
        fontWeight: 'bold',
        textAlign: 'right',
        alignSelf: 'stretch'
    }
});

export default CarsDetails;