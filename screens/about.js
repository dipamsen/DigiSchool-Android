import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Text from '../components/BigText'

export default class About extends React.Component {
  constructor() {
    super();
    console.log(this.props);
    this.state = {
      menu: 'menu',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          menuState={this.state.menu}
          menuOnPress={() => {
            if (this.state.menu == 'menu') this.setState({ menu: 'close' });
            else this.setState({ menu: 'menu' });
          }}
        />
        {this.state.menu == 'close' ? <SideMenu navigation={this.props.navigation} /> : null}
        <Text style={styles.heading}>About the Project</Text>
        <ScrollView style={styles.fullContainer}>
          <Text>
            This application is a working prototype for a Digital School.{'\n'}</Text>
          < Text style={{ fontWeight: 'bold' }}>Objective of DigiSchool:</Text>
          <Text>{`\uFFED `}Alternate to Conventional Schooling in current Pandemic Situation - Futuristic Education Platform!</Text>
          <Text>{`\uFFED `}Access to Educational Curriculum of Global Standard - Interactive, Digitalized and Collaborative Learning from Home</Text>
          <Text>{`\uFFED `}Learn with Fun - Brain Games, Discussion Wall</Text>
          <Text>{`\uFFED `}Exposure to useful websites in single umbrella - E-Lab, E-Learn, E-Library, E-Dictionary</Text>
          <Text></Text>
          <Text style={{ fontWeight: 'bold' }}>
            Features in this app:</Text>
          <Text>{`\uFFED `}Study Resources - worksheets, presentations and more!</Text>
          <Text>{`\uFFED `}Self-Assessment</Text>
          <Text>{`\uFFED `}Student Discussion</Text>
          <Text>{`\uFFED `}Activity - Brain Games</Text>
          <Text>{`\uFFED `}Repository of Useful External Links</Text>
          <Text></Text>
          <Text>
            The following frameworks and libraries have been used for the creation of this website.</Text>
          <Text style={{ fontWeight: 'bold' }}>{`\uFFED `}React Native (ReactJS) using Expo-CLI</Text>
          <Text>{`\uFFED `}React Native Elements: for Major UI elements (Header, Button, etc.)</Text>
          <Text>{`\uFFED `}React Native Vector Icons: Icons</Text>
          <Text>{`\uFFED `}React Navigation: for Navigation through screens</Text>
          <Text>{`\uFFED `}Expo-Linking: for opening urls in browser</Text>
          <Text>{`\uFFED `}Realtime Database by Firebase</Text>

          <Text style={{ fontStyle: "italic", textAlign: 'center' }}>{'\n'}This app has been created by Dipam Sen.
          </Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Dashboard') }}>
            <Text style={{ alignSelf: 'center' }}>{'\n'}Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#b8b8b8',
  },
  heading: {
    fontSize: 24,
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fullContainer: {
    margin: 20,
    height: '74%',
    paddingHorizontal: 2
  }
});