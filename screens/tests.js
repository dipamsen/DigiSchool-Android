import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
} from 'react-native';
import {
  Button,
  ThemeProvider,
} from 'react-native-elements';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Anchor from '../components/Anchor.js';

import db from '../config';

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
      currGRD: 0,
      classes: [],
      testsRaw: [],
      myTests: [],
    };
  }
  componentDidMount() {
    db.ref('digital-school/tests').on('value', (data) => {
      this.setState({ testsRaw: data.val() });
      let arr = [];
      for (let obj of data.val()) {
        if (!arr.includes(obj.grade)) arr.push(obj.grade);
      }
      this.setState({ classes: arr });
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
        {this.state.menu == 'close' ? <SideMenu navigation={this.props.navigation} /> : null}
        <Text></Text>
        <Text style={styles.heading}>Assessment</Text>
        <Text></Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              marginHorizontal: 10,
              borderColor: 'lime',
              borderWidth: 2,
              borderRadius: 20,
              width: 150,
            }}>
            <Picker
              mode="dropdown"
              selectedValue={this.state.currGRD}
              style={{
                height: 50,
                width: '100%',
              }}
              onValueChange={(itemValue) => {
                this.setState({ currGRD: itemValue, myTests: [] });
              }}>
              {this.state.classes.map((grd) => (
                <Picker.Item label={'Class ' + grd} value={grd} />
              ))}
            </Picker>
          </View>
          <ThemeProvider theme={{ colors: { primary: 'green' } }}>
            <Button title="GO" type="solid" onPress={this.showTests} />
          </ThemeProvider>
        </View>
        {this.state.myTests.length > 0 ? <Text>Select topic from the following</Text> : null}
        <ScrollView style={{ width: '80%' }}>
          {this.state.myTests.map((tsl) => (
            <Anchor
              href={tsl[2]}
              style={{
                width: '100%',
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginVertical: 3,
                marginHorizontal: 'auto',
              }}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>
                {tsl[1] + ' >> ' + tsl[0]}
              </Text>
            </Anchor>
          ))}
        </ScrollView>
        <Text style={{ fontStyle: "italic", textAlign: "center", margin: 20 }}>
          All Tests created by Dipam Sen
        </Text>
      </View>
    );
  }
  showTests = () => {
    let grd = this.state.currGRD;
    let toRender = [];
    for (let test of this.state.testsRaw) {
      if (test.grade == grd)
        toRender.push([test.topic, test.subject, test.link]);
    }
    this.setState({ myTests: toRender });
  };
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
