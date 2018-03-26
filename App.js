import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// New Imports
import TextInputScreen from './TextInputScreen';
import NumberDateScreen from './NumberDateScreen';
import ListSelectScreen from './ListSelectScreen';
import SummaryScreen from './SummaryScreen';
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
          <Scene key="Text" title="Text" icon={TabIcon}>
            <Scene 
              key="textInput"
              component={TextInputScreen}
              title="Text Input"
            />
          </Scene>

          <Scene key="NumberDate" title="Date" icon={TabIcon}>
            <Scene 
              key="numberDate"
              component={NumberDateScreen}
              title="Date"
            />
          </Scene>

          <Scene key="List" title="List" icon={TabIcon}>
            <Scene 
              key="list"
              component={ListSelectScreen}
              title="List"
            />
          </Scene>

          <Scene key="Summary" title="Summary" icon={TabIcon}>
            <Scene 
              key="summary"
              component={SummaryScreen}
              title="Summary"
            />
          </Scene>

        </Scene>
      </Scene>
    </Router>
  );
}

export default App;