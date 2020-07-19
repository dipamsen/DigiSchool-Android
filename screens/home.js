import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements'
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import ButtonGroup from '../components/ButtonGroup';

export default class Home extends React.Component {
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

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            source={require('../assets/logo.png')}
            style={{
              width: 100,
              height: 100,
              marginTop: 20,
              // aspectRatio: 5/2,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../assets/digischool.jpg')}
              style={{
                width: 330,
                height: 100,
              }}
            />
          </View>
          <ButtonGroup navigation={this.props.navigation} />
          <Text></Text>
          <ThemeProvider theme={{ colors: { primary: 'black' } }}>
            <Button icon={{ name: "info" }} buttonStyle={{ borderWidth: 1 }} onPress={() => { this.props.navigation.navigate('About') }} title="ABOUT THE PROJECT" type="outline" raised />
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#b8b8b8',
  },
});
