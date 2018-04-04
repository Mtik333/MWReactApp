import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ListScreen from '../ListScreen';
import NewsScreen from '../NewsScreen';

export const NewsStack = StackNavigator({
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
  ListScreen: {
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