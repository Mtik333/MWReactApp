import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, ScrollView, TouchableHighlight, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Permissions from 'react-native-permissions';
import moment from 'moment';
var TOTAL_NEWS_ITEMS = 10;
class ListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: {},
      loaded: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('news_items').then((news_items_str) => {
      var news_items = JSON.parse(news_items_str);
      if (news_items != null) {
        AsyncStorage.getItem('time').then((time_str) => {
          var time = JSON.parse(time_str);
          var last_cache = time.last_cache;
          var current_datetime = moment();
          var diff_days = current_datetime.diff(last_cache, 'days');
          if (diff_days > 0) {
            this.getNews();
          } else {
            this.updateNewsItemsUI(news_items);
          }
        });
      } else {
        this.getNews();
      }
    }).done();
  }

  renderNews = (news) => {
    return (
      <TouchableHighlight onPress={this.viewPage.bind(this, news.url)} underlayColor={"#E8E8E8"} style={styles.button}>
        <View style={styles.news_item}>
          <Text style={styles.news_item_text}>{news.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  viewPage = (url) => {
    //this.props.navigator.push({ name: 'web_page', url: url });
  }

  updateNewsItemsUI = (news_items) => {
    if (news_items.length == TOTAL_NEWS_ITEMS) {
      var ds = this.state.dataSource.cloneWithRows(news_items);
      this.setState({
        'news': ds,
        'loaded': true
      });
    }
  }

  updateNewsItemDB = (news_items) => {
    if (news_items.length == TOTAL_NEWS_ITEMS) {
      AsyncStorage.setItem('news_items', JSON.stringify(news_items));
    }
  }

  getNews = () => {
    var TOP_STORIES_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    var news_items = [];
    AsyncStorage.setItem('time', JSON.stringify({ 'last_cache': moment() }));
    this.fetchNews(TOP_STORIES_URL).then(
      (top_stories) => {
        console.log(top_stories);
        for (var x = 0; x <= 10; x++) {
          var story_url = "https://hacker-news.firebaseio.com/v0/item/" + top_stories[x] + ".json";
          this.fetchNews(story_url).then(
            (story) => {
              news_items.push(story);
              this.updateNewsItemsUI(news_items);
              this.updateNewsItemDB(news_items);
            }
          );
        }
      }
    );
  }

  fetchNews(url){
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      return json;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <ScrollView ref="scrollView">
            {
              this.state.loaded &&
              <ListView initialListSize={1} dataSource={this.state.news} style={styles.news} renderRow={this.renderNews}></ListView>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default ListScreen;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#FF6600',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  body: {
    flex: 9,
    backgroundColor: '#F6F6EF'
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  header_text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  news_item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5
  },
  news_item_text: {
    color: '#575757',
    fontSize: 18
  }
});