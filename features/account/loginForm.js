import { setAccountDetails } from './accountSlice' // Action Creator
import { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import React from 'react'
import {Text, TextInput, Button} from 'react-native'

// const rootURL = 'https://civp4jmvv0.execute-api.us-east-1.amazonaws.com/dev'
const rootURL = 'http://192.168.1.48:3000'
const mapDispatch = { setAccountDetails }

const loginForm = ({ setAccountDetails,setLogin }) => {
    const [idText, setIDtext] = useState('')
    const [passText, setPassText] = useState('')
    const [loginError, setLoginError] = useState(false)
    // const textSetter = (textSetter) => e => textSetter(e.target.value)
    // console.log(passText)
    const submitLogin = e => {
        e.preventDefault()
        console.log(idText,"PASS ->",passText,"<")
        

    }

    return (
        <>
            {loginError ? <Text>Error logging in. Try again or Sign Up</Text> : null}
            
             <Text>Email/ID: </Text><TextInput value={idText} onChangeText={text => setIDtext(text)} />
            <Text>Password: </Text><TextInput value={passText} onChangeText={text => setPassText(text)} secureTextEntry={true} />
                <Button onPress={submitLogin} title={"Log in"} />
            
        </>
    )
}


export default connect(null, mapDispatch)(loginForm)


