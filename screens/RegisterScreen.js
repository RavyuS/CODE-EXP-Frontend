import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { connect } from 'react-redux';
import { setAccountDetails } from '../features/account/accountSlice'; // Action Creator
import axios from 'axios';
import apiURL from '../constants/URLs';

const mapDispatch = { setAccountDetails };
const attemptRegister = (name, email, password) => {
  axios.post(`${apiURL}/api/user/create`, {
    name,
    email,
    password
  });
}

const RegisterScreen = ({ navigation, setAccountDetails }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = async () => {
    // attemptRegister(name.value, email.value, password.value)
    //   .then(resp => {
    //     if (resp.status === 201) {
    //       setAccountDetails({
    //         name: name.value,
    //         email: email.value,
    //         reservations: []
    //       })
          navigation.replace('Root');
      //   } else {
      //     setEmail({ ...email, error: 'Error' });
      //     setPassword({ ...password, error: 'Error' });
      //   }
      //   setPassword('')
      // })
      // .catch(err => {
      //   setEmail({ ...email, error: 'Error' });
      //   setPassword({ ...password, error: 'Error' });
      // })
  };

  return (
    <Background>
      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'blue' // theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue' //theme.colors.primary,
  },
});

export default connect(null, mapDispatch)(RegisterScreen);
