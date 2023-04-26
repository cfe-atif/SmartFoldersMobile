import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppColors from './../../helpers/AppColors';
import AppFontSize from './../../helpers/AppFontSize';
import AppFontFamily from './../../helpers/AppFontFamily';

export default function SFNoRecord({
  title = '',
  containerStyle = {},
  textStyle = {},
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 250);
  }, []);

  return show ? (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.heading, textStyle]}>{title}</Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  heading: {
    textAlign: 'center',
    color: AppColors.black,
    fontSize: AppFontSize.size20,
    fontFamily: AppFontFamily.bold,
  },
});
