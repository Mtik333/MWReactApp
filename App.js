import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// New Imports
import GPSScreen from './GPSScreen';
import MagnetometerScreen from './MagnetometerScreen';
import AccelerometerScreen from './AccelerometerScreen';
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
          <Scene key="GPS" title="GPS" icon={TabIcon}>
            <Scene 
              key="GPS"
              component={GPSScreen}
              title="GPS Screen"
            />
          </Scene>

          <Scene key="Magnetometer" title="Magnetometer" icon={TabIcon}>
            <Scene 
              key="Magnetometer"
              component={MagnetometerScreen}
              title="Magnetometer Screen"
            />
          </Scene>

          <Scene key="Accelerometer" title="Accelerometer" icon={TabIcon}>
            <Scene 
              key="Accelerometer"
              component={AccelerometerScreen}
              title="Accelerometer Screen"
            />
          </Scene>

        </Scene>
      </Scene>
    </Router>
  );
}
export default App;