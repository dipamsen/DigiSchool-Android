import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Button from '../components/Button';

export default class SideMenu extends React.Component {
  render() {
    return (
      <View style={styles.menu}>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Study_Material');
          }}
          icon="bookmark"
          name="Study Material"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Assessment');
          }}
          icon="pen"
          type="font-awesome-5"
          name="Tests"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Project_Submit');
          }}
          icon="publish"
          type="entypo"
          name="Submit Project"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Activity');
          }}
          icon="extension"
          name="Activity"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Discuss');
          }}
          icon="chat"
          type="entypo"
          name="Discuss"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Feedback');
          }}
          icon="feedback"
          name="Feedback"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
