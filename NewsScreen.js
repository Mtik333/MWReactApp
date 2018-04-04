import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Button,
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import lodash from 'lodash';
import App from './App';

class NewsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      url: "https://medium.com/nanonets/how-to-easily-detect-objects-with-deep-learning-on-raspberrypi-225f29635c74"
    };
  }
  loadAsync = async () => {
    this.state.url = await AsyncStorage.getItem('url');
  }
  truncate = (str) => {
    return lodash.truncate(str, 20);
  }

  // componentWillMount(){
  //   Actions.refresh({test:Math.random()});
  //   console.log("aaa;"+this.props.url);
  // }

  // componentDidMount(){
  //   Actions.refresh({test:Math.random()});
  //   console.log("bbb;"+this.props.url);
  // }

  // componentWillUpdate(){
  //   Actions.refresh({test:Math.random()});
  //   console.log("ccc;"+this.props.url);
  // }

  // componentDidUpdate(){
  //   Actions.refresh({test:Math.random()});
  //   console.log("ddd;"+this.props.url);
  // }
  
  onNavigationStateChange = (navState) => {
    if(!navState.loading){
        this.setState({
            isLoading: false,
            pageTitle: navState.title
        });
    }
  }

  back(){
    
  }

  render() {
    (async () => {
      await this.loadAsync();
    })();
    return (
      <View style={styles.container}>
        <View style={styles.webview_header}>
          <View style={styles.header_item}>
            <Button style={styles.button} title="Back" onPress={this.back}>Back</Button>
          </View>
          <View style={styles.header_item}>
            <Text style={styles.page_title}>{this.truncate(this.state.pageTitle)}</Text>
          </View>
        </View>
        <View style={styles.webview_body}>
          <WebView
            url={this.state.url}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1
  },
  webview_header: {
      paddingLeft: 10,
      backgroundColor: '#FF6600',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row'
  },
  header_item: {
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center'
  },
  webview_body: {
      flex: 9
  },
  button: {
      textAlign: 'left',
      color: '#FFF'
  },
  page_title: {
      color: '#FFF'
  },
  spinner: {
      alignItems: 'flex-end'
  }
});

export default NewsScreen;