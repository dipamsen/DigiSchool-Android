import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Keyboard
} from 'react-native';
import {
  Icon,
  Button,
  ThemeProvider,
  Header,
} from 'react-native-elements';
import MyHeader from '../components/Header';
import SideMenu from '../components/SideMenu';
import Anchor from '../components/Anchor.js';

import db from '../config';

const myIcons = {
  ws: 'file-alt',
  app: 'mobile-alt',
  ppt: 'file-powerpoint',
};

// Ternary Operator: <*IMP*>

// format:-
// {condition ? tVal : fVal}

// meaning:
// if(condition) return tVal
// else return fVal

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: 'menu',
      chapter: '',
      grade: '',
      type: 0,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <MyHeader
          navigation={this.props.navigation}
          menuState={this.state.menu}
          menuOnPress={() => {
            if (this.state.menu == 'menu') this.setState({ menu: 'close' });
            else this.setState({ menu: 'menu' });
          }}
        />
        {this.state.menu == 'close' ? <SideMenu navigation={this.props.navigation} /> : null}
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: "space-around", alignItems: "center" }}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Study_Material') }}>
            <Icon name="arrow-left" type="feather" color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24 }}>Request Resources</Text>
          <Text></Text>
        </View>
        <Text></Text>
        <View style={{ marginHorizontal: 60, marginTop: 20 }}>
          <View style={{ borderBottomWidth: 1 }}>
            <TextInput
              value={this.state.class}
              style={{ fontSize: 18 }}
              onChangeText={(grd) => { this.setState({ class: grd }) }}
              placeholder="Class"
              placeholderTextColor="black"
            ></TextInput>
          </View>
          <View style={{ borderBottomWidth: 1, marginTop: 20 }}>
            <TextInput
              value={this.state.chapter}
              style={{ fontSize: 18 }}
              onChangeText={(chapter) => { this.setState({ chapter }) }}
              placeholder="Chapter Name"
              placeholderTextColor="black"
            ></TextInput>
          </View>
          <View style={{ borderWidth: 1, marginVertical: 20 }}>
            <Picker mode="dropdown" style={{ fontSize: 18 }}
              onValueChange={(itemValue) => {
                this.setState({ type: itemValue });
              }} selectedValue={this.state.type}>
              <Picker.Item label={'Type'} value={0} />
              <Picker.Item label={'Worksheet'} value={1} />
              <Picker.Item label={'Test'} value={2} />
              <Picker.Item label={'PPT'} value={3} />
            </Picker>
          </View>
          <ThemeProvider theme={{ colors: { primary: 'black' } }}>
            <Button title="Submit" onPress={() => { this.submit() }} />
          </ThemeProvider>
        </View>
      </View >
    );
  }
  submit = () => {
    console.log('In Submit')
    console.log(this.state.chapter, this.state.class, this.state.type)
    if (!this.state.chapter) return;
    console.log('pass 1')
    if (!parseInt(this.state.class)) return;
    console.log('pass 2')
    if (this.state.type == 0) return;
    console.log('pass 3')
    console.log('Tests Passed')
    let ref = db.ref('digital-school/req-content')
    ref.once("value", (data) => {
      let index = 0;
      if (data.val()) index = data.val().length;
      ref.update({
        [index]: {
          class: this.state.class,
          chapter: this.state.chapter,
          type: this.state.type
        }
      })
      alert('Response Recorded');
      this.setState({
        type: 0,
        chapter: '',
        class: ''
      });
      Keyboard.dismiss();
    })
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#b8b8b8',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

//
