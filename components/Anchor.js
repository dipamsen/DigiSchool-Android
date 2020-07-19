import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as Linking from 'expo-linking' ;

export default class Anchor extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };
  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this._handlePress}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}