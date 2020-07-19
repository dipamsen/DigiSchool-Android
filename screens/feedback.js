import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  Button,
  ThemeProvider,
} from 'react-native-elements';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

import db from '../config';

// Ternary Operator: <*IMP*>

// format:-
// {condition ? tVal : fVal}

// meaning:
// if(condition) return tVal
// else return fVal

export default class Activity extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: 'menu',
      name: '',
      main: '',
      mail: '',
    };
  }
  componentDidMount() {
    db.ref('digital-school/feedback').on('value', (data) => {
      let count = data.val().length;
      db.ref('digital-school').update({
        fbcount: count,
      });
    });
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
        {this.state.menu == 'close' ? (
          <SideMenu navigation={this.props.navigation} />
        ) : null}
        <Text></Text>
        
        <Text style={styles.heading}>Feedback and Suggestions</Text>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            onChangeText={(txt) => {
              this.setState({ name: txt });
            }}
            ref={(input) => {
              this.textInput1 = input;
            }}
            placeholder="Name*"
            style={styles.placeholder}
          />
          <TextInput
            onChangeText={(txt) => {
              this.setState({ mail: txt });
            }}
            ref={(input) => {
              this.textInput2 = input;
            }}
            placeholder="Email"
            style={styles.placeholder}
          />
          <TextInput
            onChangeText={(txt) => {
              this.setState({ main: txt });
            }}
            ref={(input) => {
              this.textInput3 = input;
            }}
            placeholder="Feedback or Suggestion*"
            multiline
            numberOfLines={5}
            style={styles.placeholder}
          />
          <ThemeProvider theme={{ colors: { primary: 'green' } }}>
            <Button title="Submit" onPress={this.submit} />
          </ThemeProvider>
        </View>
      </View>
    );
  }
  submit = () => {
    if (this.state.name.trim() && this.state.main.trim()) {
      db.ref('digital-school/fbcount').once('value', (data) => {
        let index = data.val();
        db.ref('digital-school/feedback').update({
          [index]: {
            name: this.state.name,
            mail: this.state.mail,
            main: this.state.main,
          },
        });
      });
    }
    Keyboard.dismiss();
    this.textInput1.clear();
    this.textInput2.clear();
    this.textInput3.clear();
  };
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  placeholder: {
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'top',
    fontSize: 18,
    width: '80%',
  },
});

//
