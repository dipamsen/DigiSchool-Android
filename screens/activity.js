import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  ThemeProvider,
  Card,
  ListItem,
} from 'react-native-elements';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Anchor from '../components/Anchor.js';

// Ternary Operator: <*IMP*>

// format:-
// {condition ? tVal : fVal}

// meaning:
// if(condition) return tVal
// else return fVal

const games = [
  {
    name: 'Maze',
    link: 'https://editor.p5js.org/dipam2006/present/jbjYPTkIe',
    description: 'Maze Game - Travel to the red block',
  },
  {
    name: 'The Tower of Hanoi',
    link: 'https://editor.p5js.org/dipam2006/present/JS-D-xNjE',
    description:
      "Move the tower from one peg to another by moving one disk at a time. But don't place a larger disk on a smaller one.",
  },
  {
    name: '8-puzzle',
    link: 'https://editor.p5js.org/dipam2006/present/vaorX29da',
    description: 'Arrange the digits in ascending order by sliding the blocks.',
  },
];

const links = [
  {
    name: 'E-Lab',
    link:
      'https://phet.colorado.edu/en/simulations/filter?sort=alpha&view=grid',
    description: 'PhET Interactive Simulations',
  },
  {
    name: 'E-Learn',
    link: 'https://www.khanacademy.org/',
    description: 'Khan Academy',
  },
  {
    name: 'E-Library',
    link: 'https://ndl.iitkgp.ac.in/',
    description: 'National Digital Library of India',
  },
  {
    name: 'Learn to code',
    link: 'https://code.org/',
    description: 'Code.org',
  },
  {
    name: 'Dictionary',
    link: 'https://www.oxfordlearnersdictionaries.com/',
    description: 'Oxford Dictionary',
  },
];

export default class Activity extends React.Component {
  constructor() {
    super();
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
        {this.state.menu == 'close' ? (
          <SideMenu navigation={this.props.navigation} />
        ) : null}
        <Text></Text>
        <Text style={styles.heading}>Activity</Text>
        <ThemeProvider theme={{ colors: { primary: 'green' } }}>
          <ScrollView>
            <Card
              containerStyle={{
                borderColor: 'green',
                borderWidth: 2,
                borderRadius: 10,
              }}
              title="Brain Games">
              {games.map((game, i) => (
                <Anchor href={game.link}>
                  <ListItem
                    key={i}
                    title={game.name}
                    subtitle={game.description}
                    bottomDivider
                  />
                </Anchor>
              ))}
              <Text style={{ fontStyle: "italic", textAlign: "center", marginTop: 20 }}>
                Created by Dipam Sen
              </Text>
            </Card>
            <Card
              containerStyle={{
                borderColor: 'green',
                borderWidth: 2,
                borderRadius: 10,
              }}
              title="Outsider Links">
              {links.map((link, i) => (
                <Anchor href={link.link}>
                  <ListItem
                    key={i}
                    title={link.name}
                    subtitle={link.description}
                    bottomDivider
                  />
                </Anchor>
              ))}
            </Card>
            <Text>{'\n\n\n\n\n\n\n\n\n\n'}</Text>
          </ScrollView>
        </ThemeProvider>
      </View>
    );
  }
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
});

//
