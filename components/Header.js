import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from 'react-navigation';

class MyHeader extends React.Component {
  render() {
    return (
      <Header
        style={{ flex: 0.1 }}
        barStyle="light-content"
        placement="left"
        backgroundColor={'green'}
        leftComponent={
          <TouchableOpacity onPress={this.props.menuOnPress}>
            <Icon name={this.props.menuState} color="white" />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'DigiSchool',
          style: {
            fontSize: 24,
            color: 'white',
          },
        }}
        rightComponent={
          <Icon
            onPress={() => {
              this.props.navigation.navigate('Dashboard');
            }}
            style={{ display: this.props.visible }}
            reverse
            name="home"
            color="white"
            reverseColor="green"
          />
        }
      />
    );
  }
}

export default MyHeader;
