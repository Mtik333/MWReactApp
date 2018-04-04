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
    };
  }
  truncate = (str) => {
    return lodash.truncate(str, 20);
  }

  onNavigationStateChange = (navState) => {
    if(!navState.loading){
        this.setState({
            isLoading: false,
            pageTitle: navState.title
        });
    }
  }

  back = () => {
    this.props.navigation.navigate('ListScreen');
  }

  render() {
    const { url } = this.props.navigation.state.params;
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
            url={url}
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