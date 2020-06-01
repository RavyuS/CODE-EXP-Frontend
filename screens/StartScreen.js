import React, { memo, useEffect } from 'react';
import { Text } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const StartScreen = ({ navigation }) => {

  // useEffect(() => console.log('hi', navigation));
 
  // return <Text>hi ther</Text>

  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>

      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
};

export default StartScreen;
