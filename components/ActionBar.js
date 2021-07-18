import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import Images from '../constants/Images';

const ActionBar = () => {
  return (
    <View style={styles.contents}>
      <Text style={styles.text}>
        <Text style={styles.text}>Hi</Text>
        <Text style={[styles.text, {fontWeight: 'bold'}]}> Guest!</Text>
      </Text>
      <Image source={Images.Logo} style={styles.image} />
    </View>
  );
};
const styles = StyleSheet.create({
  contents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  text: {
    marginLeft: 20,
    fontSize: 20,
    marginTop: 15,
    alignItems: 'flex-start',
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40 / 2,
    marginTop: 5,
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
});
export default ActionBar;
