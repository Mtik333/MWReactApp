import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ListScreen from '../ListScreen';
import NewsScreen from '../NewsScreen';
// import QueryDatabase from '../Zadanie4/QueryDatabase';
// import CarsList from '../Zadanie4/CarsList';
// import CarsDetails from '../Zadanie4/CarsDetails';
import SongsList from '../Zadanie5/SongsList';
import SongView from '../Zadanie5/SongView';

export const NewsStack = StackNavigator({

  SongsList:{
    screen: SongsList,
    navigationOptions:{
      title: 'Test audio',
    },
  },
  SongView:{
    screen: SongView,
    navigationOptions: ({ navigation }) => ({
      song: `${navigation.state.params.song}`,
      title: `${navigation.state.params.song.band}`+' - '+`${navigation.state.params.song.title}`,
    }),
  },
  // QueryDatabase: {
  //   screen: QueryDatabase,
  //   navigationOptions: {
  //     title: 'Filter entries in database',
  //   },
  // },
  // CarsList:{
  //   screen: CarsList,
  //   navigationOptions: ({ navigation }) => ({
  //     filter: `${navigation.state.params.filter}`,
  //     title: 'List of entries',
  //   }),
  // },
  // CarsDetails:{
  //   screen: CarsDetails,
  //   navigationOptions: ({ navigation }) => ({
  //     car: `${navigation.state.params.car}`,
  //     title: `${navigation.state.params.car.year}`+' '+`${navigation.state.params.car.manufacturer}`+' '+`${navigation.state.params.car.model}`,
  //   }),
  // },
});
export const Tabs = TabNavigator({
  SongsList: {
    screen: NewsStack,
    navigationOptions: {
      tabBarLabel: 'DB Test',
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