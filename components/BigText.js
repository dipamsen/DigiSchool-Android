import React from 'react';
import { Text } from 'react-native-elements';

export default class BigText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[{ fontSize: 16, marginVertical: 3 }, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}