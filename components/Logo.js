import React, { memo } from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/images/logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 144,
    height: 135,
    marginBottom: 12,
  },
});

export default memo(Logo);
