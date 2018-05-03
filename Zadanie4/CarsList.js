import React, { Component } from 'react';
import { StyleSheet, ListView, Text, View, TextInput, AsyncStorage, Button, Switch,ScrollView, TouchableHighlight } from 'react-native';
import AppDB from '../AppDB';
let appDB = new AppDB();

class CarsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            text: '',
            loaded: false,
            filter: this.props.navigation.state.params,
            items: []
        };
    
    }

    viewPage = (car) => {
        this.props.navigation.navigate('CarsDetails', { car });
    }


    componentWillMount() {
        var test= appDB._getFiltered(this.state.filter);
        this.setState({items:test})
        console.log(this.props.navigation.state.params);
    }

    renderNews = (car) => {
        return (
          <TouchableHighlight onPress={() => this.viewPage(car)} underlayColor={"#FFFFFF"} style={styles.button}>
            <View style={styles.news_item}>
              <Text style={styles.news_item_text}>{car.model} {car.manufacturer}</Text>
            </View>
          </TouchableHighlight>
        );
      }


    render() {
        if (this.state.items.length){
            return (
                <View style={styles.container}>
                <View style={styles.body}>
                  <ScrollView ref="scrollView">
                    {
                        this.state.items.map((car) => {
                            return this.renderNews(car);
                        })
                    }
                  </ScrollView>
                </View>
              </View>
            );
        }
    }
}

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
    body: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F6F6EF'
    },
    news_item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 15,
        margin: 5,
        flex: 1
      },
      news_item_text: {
        color: '#575757',
        fontSize: 18
      }
  });

export default CarsList;