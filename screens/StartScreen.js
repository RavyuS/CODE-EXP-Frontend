import React, { memo, useEffect } from 'react';
import { Text } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const StartScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      <Header>SafeLah!</Header>

      <Paragraph>
        Plan your trips, beat the crowd
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Register')}
      >
        Sign Up
      </Button>
    </Background>
  )
};

export default StartScreen;
