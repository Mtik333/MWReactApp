import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ListScreen from '../ListScreen';
import NewsScreen from '../NewsScreen';
import QueryDatabase from '../Zadanie4/QueryDatabase';

export const NewsStack = StackNavigator({

  QueryDatabase: {
    screen: QueryDatabase,
    navigationOptions: {
      title: 'QueryDatabase',
    },
  },
  ListScreen: {
    screen: ListScreen,
    navigationOptions: {
      title: 'News',
    },
  },
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.url}`,
    }),
  },
});
export const Tabs = TabNavigator({
  QueryDatabase: {
    screen: NewsStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
});
export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});