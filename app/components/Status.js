import React, {Component} from 'react';
import {Constants} from 'expo';
import {
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const statusHeight =
  Platform.OS === 'ios' ? (
    <View>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
    </View>
  ) : (
    0
  );

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
    };
  }
  render() {
    const {info} = this.state;
    const isConnected = info !== 'none';
    const backgroundColor = isConnected ? 'white' : 'red';
    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? 'dark-content' : 'light-content'}
        animated={false}
      />
    );
    if (Platform.OS === 'ios') {
      return <View style={[styles.status, {backgroundColor}]} />;
    }
    return null;
  }
}
const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
});
