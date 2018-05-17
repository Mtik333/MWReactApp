import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, Button, Switch,ScrollView, TouchableHighlight } from 'react-native';

var Sound = require('react-native-sound');
var whoosh;

class SongsList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            songs:[
                {band: "Kyuss", title: "Hurricane", url: "http://storage.mp3-cc.com/download/2724673/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvWC9uZHdWRnBTT09CeFFBdmI4VlBHUlMvTEc2OUMxMlc0ZXlRK0pPWEZ3QWpzVEhHNVJaNXNQaS9lRDNTL2RXU2lYODA3Z0wzdmR6NVF6L0dJVm5kS08/kyuss-hurricane_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "One Inch Man", url: "http://storage.mp3-cc.com/download/3077700/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvVmU3anFacUhBblVYUkRCTjgwWDYwdHdqWVZrR1BSRDl6Rk1jeUZmL3pDYTMwbkxpTmM0ajBuT0RFMFJsTXM3ekNnT1FWSlFRajBOcWxGMmoyWDdmSVA/kyuss-one-inch-man_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "Thee Ol' Boozeroony", url: "http://storage.mp3-cc.com/download/20637594/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvVkFWUlNLMzFBTlJtdk1HaXF4RUhFeTlBNDd2bk5CVzhzMUdHOS90VXcyYllCYUo3YXVKRUtReE9rNUx4RkUzZFVpOXcvYkkzTkdTSXVZRSttdHZUeVA/kyuss-thee-ol-boozeroony_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "Gloria Lewis", url: "http://storage.mp3-cc.com/download/20637592/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvVkFWUlNLMzFBTlJtdk1HaXF4RUhFeS9qc1dZaS9JQ0pjNkdpQ2p6di9zNzB2bmxJTWErelNaeVZ2VFcvckJTQ0RvbUxTZzZ1elRjSHV4d0ptS1NlU1k/kyuss-gloria-lewis_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "Phototropic", url: "http://storage.mp3-cc.com/download/20637581/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvVkFWUlNLMzFBTlJtdk1HaXF4RUhFeVNoT1JUVGp6bnpZM0twSFEyMFIwY0FSbWlZODNCSGswWnF4aWxPRk45azdxOC9vRUw2VG9YQ2lXMHN5QWJWNjQ/kyuss-phototropic_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "El Rodeo", url: "http://storage.mp3-cc.com/download/3372314/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvVnpZdUxGVkV4bE1lZ3BvdzR2UXNPbm9paHZidU9TRGR6UFhBVEs1blZ5RWZtVUpWdnpVOVhvTjJKSEM1dlQ5V2RRUWplbUcya2NZeEV0U2ZsNW5iUFU/kyuss-el-rodeo_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "Jumbo Blimp Jumbo", url: "http://storage.mp3-cc.com/download/18109770/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvV0FJMXBiNXBTN0Z1M2hITmlVTmsyVnhhY08ycDFYTDYzVFNELzFiV2Q2cFlVU0UyNm9mZmdud3JKVGhFc0k3WTluZkdIbjhxbm43RjJ3VDI2WHVYNWI/kyuss-jumbo-blimp-jumbo_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "Tangy Zizzle", url: "http://storage.mp3-cc.com/download/20637574/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvVkFWUlNLMzFBTlJtdk1HaXF4RUhFeU1hZ0lvYXBYYWVSSk5WQWtRcmFyOUFwZTYzeW04K2pPS2dKVVZENmtzU3VQWFF2UkxOWm5JcDBrQWpCbTRLNm0/kyuss-tangy-zizzle_(mp3-CC.com).mp3"},
                {band: "Kyuss", title: "Catamaran", url: "http://storage.mp3-cc.com/download/314586/eEgrTkE0M1kxUTlhT3RNTmhKRVBia2d0Tm1DMU1aT3lidHkyN3UvcXcvWHQxZVVQNnFIbUhOdFZ0bTlrWkNDWEdnVlp6T1dWOEVnRjhoRWYvSU1nMzBpUDJjWUFxa29vZk4xY2cvN1NrNWtkdWlYWTdaRGNSQldJblpwWDZwS3k/kyuss-catamaran_(mp3-CC.com).mp3"},
                {band: "Republika", title: "Telefony", url: "telefony.mp3"},
            ]
        };
    }

    viewPage = (car) => {
        this.props.navigation.navigate('SongView', { car });
    }

    renderNews = (car) => {
        return (
          <TouchableHighlight onPress={() => this.viewPage(car)} underlayColor={"#FFFFFF"} style={styles.button}>
            <View style={styles.news_item}>
              <Text style={styles.news_item_text}>{car.band}-{car.title} </Text>
            </View>
          </TouchableHighlight>
        );
      }

    render() {
        if (this.state.songs.length){
            return (
                <View style={styles.container}>
                <View style={styles.body}>
                  <ScrollView ref="scrollView">
                    {
                        this.state.songs.map((car) => {
                            return this.renderNews(car);
                        })
                    }
                  </ScrollView>
                </View>
              </View>
            );
        }
        else return (
            <View style={styles.container}>
                    <Text style={styles.news_item_text}>No results</Text>
              </View>
        );
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

export default SongsList;