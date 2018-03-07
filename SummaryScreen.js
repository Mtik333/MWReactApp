import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const SummaryScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.welcome}
      >
        SummaryScreen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aa00aa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default SummaryScreen;