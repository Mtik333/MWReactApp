import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// New Imports
import ListScreen from './ListScreen';
import NewsScreen from './NewsScreen';
// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}

const App = () => {
  return (
    <Router>
      <Scene key="root">
        {/* Tab Container */}
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Tab and it's scenes */}
          <Scene key="List" title="News list" icon={TabIcon}>
            <Scene 
              key="list"
              component={ListScreen}
              title="List Screen"
            />
          </Scene>

          <Scene key="News" title="Picked news" icon={TabIcon}>
            <Scene 
              key="News"
              component={NewsScreen}
              title="News Screen"
            />
          </Scene>

        </Scene>
      </Scene>
    </Router>
  );
}
export default App;