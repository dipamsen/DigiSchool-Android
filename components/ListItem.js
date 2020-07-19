import * as React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';

class ListItem extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
        <Icon name={this.props.icon} type={this.props.type} />
        <Text
          style={{
            position: 'relative',
            left: 30,
            fontSize: 18,
            height: '100%',
          }}>
          {this.props.name.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}
export default ListItem;

const styles = StyleSheet.create({
  item: {
    width: '90%',
    borderWidth: 1,
    marginHorizontal: '5%',
    marginVertical: 8,
    padding: 10,
    flexDirection: 'row',
    fontSize: 26,
  },
});
