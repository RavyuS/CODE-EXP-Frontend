import LoginForm from '../account/loginForm'
import {  StyleSheet, View } from 'react-native'
import React from 'react'

export default ({setLogin}) => {

    return (
        <View style={styles.container}>
            <LoginForm setLogin={setLogin}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})