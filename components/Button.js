import * as React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
        <Icon name={this.props.icon} size={35} type={this.props.type} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
          }}>
          {this.props.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 60,
    borderWidth: 1,
    width: 110,
    height: 110,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
});
