import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';

import ListItem from '../components/ListItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class SideMenu extends React.Component {
  render() {
    return (
      <ScrollView style={styles.menu}>
        <ListItem
          onPress={() => {
            this.props.navigation.navigate('Dashboard');
          }}
          icon="person"
          name="Dashboard"
        />
        <ListItem
          onPress={() => {
            this.props.navigation.navigate('Study_Material');
          }}
          icon="bookmark"
          name="Study Material"
        />
        <ListItem onPress={() => {
          this.props.navigation.navigate('Assessment');
        }} icon="pen" type="font-awesome-5" name="Tests" />
        <ListItem onPress={() => {
          this.props.navigation.navigate('Project_Submit');
        }} icon="publish" type="entypo" name="Submit Project" />
        <ListItem onPress={() => {
          this.props.navigation.navigate('Activity');
        }} icon="extension" name="Activity" />
        <ListItem onPress={() => {
          this.props.navigation.navigate('Discuss');
        }} icon="chat" type="entypo" name="Discuss" />
        <ListItem onPress={() => {
          this.props.navigation.navigate('Feedback');
        }} icon="feedback" name="Feedback" />
        <ListItem onPress={() => {
          this.props.navigation.navigate('About');
        }} icon="info" name="About" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    height: '100%',
    backgroundColor: 'white',
    width: '100%',
  },
});
