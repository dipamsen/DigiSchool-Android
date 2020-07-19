import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Dashboard from './screens/home';
import Study_Material from './screens/study';
import Assessment from './screens/tests';
import Project_Submit from './screens/project';
import Activity from './screens/activity';
import Discuss from './screens/chat';
import Feedback from './screens/feedback';
import About from './screens/about';
import Request from './screens/request'

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <MYApp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MYApp = createAppContainer(
  createSwitchNavigator({
    Dashboard,
    Study_Material,
    Assessment,
    Project_Submit,
    Activity,
    Discuss,
    Feedback,
    About,
    Request
  })
);
