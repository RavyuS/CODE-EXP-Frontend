import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, processColor } from 'react-native';
import { connect } from 'react-redux'
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { setAccountDetails } from '../features/account/accountSlice' // Action Creator
import axios from 'axios'
// import {AWS_URL} from 'react-native-dotenv'
// import { theme } from '../core/theme';
// import { emailValidator, passwordValidator } from '../core/utils';
import apiURL from '../constants/URLs'
const mapDispatch = { setAccountDetails }


const LoginScreen = ({ navigation, setAccountDetails }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    attemptLogin(email.value, password.value)
      .then(resp => {
        console.log(resp.data)
        if (resp.status === 200) setAccountDetails(resp.data)
        // setEmail('')
        setPassword('')
        navigation.replace('Search');
      })
      .catch(err => {
        console.log(err)

        setEmail({ ...email, error: 'Incorrect email' });
        setPassword({ ...password, error: 'Error' });
      })
  };

  return (
    <Background>

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
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

      <View style={styles.forgotPassword} />

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: 'blue'
  },
  link: {
    fontWeight: 'bold',
    color: 'black'
  },
});

const attemptLogin = (id, password) => axios.get(`${apiURL}/api/user/authenticate?id=${id}&pass=${password}`)

export default connect(null, mapDispatch)(LoginScreen);
