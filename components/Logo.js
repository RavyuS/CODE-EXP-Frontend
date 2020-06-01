import React, { memo } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const Logo = () => (
  <Text>hi</Text>
  // <Image source={require('../assets/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(Logo);
