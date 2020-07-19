import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import {
  Icon,
  Image,
  ButtonGroup,
  Button,
  ThemeProvider,
  Card,
  ListItem,
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
      chats: [],
      txt: '',
    };
  }
  componentDidMount() {
    db.ref('digital-school/chats').on('value', (data) => {
      this.setState({ chats: data.val() });
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View>
          <Header
            navigation={this.props.navigation}
            menuState={this.state.menu}
            menuOnPress={() => {
              if (this.state.menu == 'menu') this.setState({ menu: 'close' });
              else this.setState({ menu: 'menu' });
            }}
          />
          {this.state.menu == 'close' ? <SideMenu navigation={this.props.navigation} /> : null}
          <Text></Text>
          <Text style={styles.heading}>Discussion Wall</Text>
          <ScrollView
            style={{
              marginHorizontal: 30,
              height: '70%',
            }}
            contentContainerStyle={{
              alignItems: 'flex-start'
            }}>
            {this.state.chats.map((message) => (
              <Text style={{ fontSize: 16, borderWidth: 1, borderRadius: 8, paddingVertical: 4, paddingHorizontal: 5, marginVertical: 3 }}>{message}</Text>
            ))}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              borderWidth: 1,
              borderRadius: 20,
              padding: 10,
              marginHorizontal: 20,
            }}>
            <TextInput
              placeholder="Write something here..."
              ref={(input) => {
                this.textInput = input;
              }}
              style={{ width: '90%', fontSize: 20 }}
              onChangeText={(text) => {
                this.setState({ txt: text });
              }}
            />
            <TouchableOpacity
              title="GO"
              onPress={() => {
                this.updateDb();
              }}>
              <Icon name="send" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  updateDb = () => {
    Keyboard.dismiss();
    let index = this.state.chats.length;
    // clear();
    if (!this.state.txt.trim()) return;
    db.ref('digital-school/chats').update({
      [index]: this.state.txt.trim(),
    });
    this.textInput.clear();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

//
