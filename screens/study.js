import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
      currclass: 0,
      classesArr: [],
      resources: [],
      resourceList: [],
      subjects: [],
      menu: 'menu',
    };
  }
  componentDidMount() {
    db.ref('digital-school/study-resources').on('value', (data) => {
      this.setState({
        resources: data.val(),
      });
      let grades = [];
      //The below thing tells that if the grade is array then push all items of the array to grades.
      for (let rs of data.val()) {
        if (!grades.includes(rs.grd) && typeof rs.grd == 'number')
          grades.push(rs.grd);
        if (typeof rs.grd == 'object') {
          for (let theclass of rs.grd)
            if (!grades.includes(theclass)) {
              grades.push(theclass);
            }
        }
      }
      grades.sort((a, b) => a - b);
      this.setState({
        classesArr: grades,
      });
    });
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
        <View>
          <ThemeProvider
            theme={{
              colors: { primary: 'green' },
            }}>
            <Header
              containerStyle={{ margin: 0 }}
              backgroundColor="white"
              centerComponent={{ text: "Study Materials", style: { fontSize: 24 } }}
              rightComponent={
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Request') }}>
                  <Icon name="pluscircle" type="antdesign" size={24} /></TouchableOpacity>
              } />

            <View style={styles.buttonGroup}>
              {this.state.classesArr.map((grd) => (
                <Button
                  containerStyle={{ borderRadius: 0 }}
                  buttonStyle={{ borderRadius: 0 }}
                  title={'Class ' + grd}
                  type={this.state.currclass == grd ? 'solid' : 'outline'}
                  onPress={() => {
                    this.goToClass(grd);
                  }}
                />
              ))}
            </View>
          </ThemeProvider>
          <Text> </Text>
          <ThemeProvider theme={{ colors: { primary: 'orange', secondary: 'black' } }}>
            <View style={styles.buttonGroup}>
              {this.state.subjects.map((sub) => (
                <Button
                  buttonStyle={{ borderRadius: 0 }}
                  containerStyle={{ borderRadius: 0, marginVertical: 5 }}
                  title={sub}
                  type={this.state.currSub == sub ? 'solid' : 'outline'}
                  onPress={() => {
                    this.goToSubj(this.state.currclass, sub);
                  }}
                />
              ))}
            </View>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                backgroundColor: 'green',
                borderWidth: 1,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
                RESOURCES
            </Text>
            </View>

            <ScrollView>
              {this.state.resourceList.map((tpctp) => (
                <Anchor
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 8,
                    margin: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  href={tpctp[2]}>
                  <Icon
                    name={myIcons[tpctp[1]]}
                    type="font-awesome-5"
                    color="black"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      marginHorizontal: 5,
                    }}>
                    {tpctp[0]}
                  </Text>
                </Anchor>
              ))}
            </ScrollView>
            <View><Text style={{ alignSelf: "center" }}>Key: </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Icon style={{ margin: 5 }} name={myIcons.ws} type="font-awesome-5" />
                <Text>Worksheet</Text>
                <Icon style={{ margin: 5 }} name={myIcons.ppt} type="font-awesome-5" />
                <Text>Presentation</Text>
                <Icon style={{ margin: 5 }} name={myIcons.app} type="font-awesome-5" />
                <Text>App</Text>
              </View><Text style={{ textAlign: 'center' }}>{'\n\n'}To request content, tap on the (+) icon.{'\n\n'}</Text>
              <Text style={{ fontStyle: "italic", textAlign: "center" }}>All Study Materials and Apps created by Dipam Sen</Text>
            </View>
          </ThemeProvider>
        </View></View>
    );
  }
  goToClass = (grd) => {
    this.setState({
      currclass: grd,
      currSub: '',
      resourceList: [],
    });
    let subs = [];
    for (let obj of this.state.resources) {
      if (!subs.includes(obj.subject)) {
        if (
          (typeof obj.grd == 'number' && obj.grd == grd) ||
          (typeof obj.grd == 'object' && obj.grd.includes(grd))
        )
          subs.push(obj.subject);
      }
    }
    subs.sort((a, b) => a[0] - b[0]);
    this.setState({
      subjects: subs,
    });
  };
  goToSubj = (grd, sub) => {
    this.setState({ currSub: sub });
    let render = [];
    for (let obj of this.state.resources) {
      // If it is number then add the thing to the class
      // If it is array then add the thing to all those classes.
      if (
        (typeof obj.grd == 'number' && obj.grd == grd) ||
        (typeof obj.grd == 'object' && obj.grd.includes(grd))
      ) {
        if (obj.subject == sub) render.push([obj.topic, obj.type, obj.link]);
      }
    }
    // The thing to render
    this.setState({
      resourceList: render,
    });
  };
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
