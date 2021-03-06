import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import store from './state/store'
import useCachedResources from './hooks/useCachedResources'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import LinkingConfiguration from './navigation/LinkingConfiguration'
import LoginScreen from './screens/LoginScreen'
import StartScreen from './screens/StartScreen';
import RegisterScreen from './screens/RegisterScreen';

import { 
  useFonts,
  JosefinSans_100Thin,
  JosefinSans_200ExtraLight,
  JosefinSans_300Light,
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  JosefinSans_600SemiBold,
  JosefinSans_700Bold,
  JosefinSans_100Thin_Italic,
  JosefinSans_200ExtraLight_Italic,
  JosefinSans_300Light_Italic,
  JosefinSans_400Regular_Italic,
  JosefinSans_500Medium_Italic,
  JosefinSans_600SemiBold_Italic,
  JosefinSans_700Bold_Italic 
} from '@expo-google-fonts/josefin-sans';

const Stack = createStackNavigator()

export default function App() {
  const isLoadingComplete = useCachedResources()
  let [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_700Bold,
  });
  // const isLoggedIn = store.getState().account.userID
  // const [login, setLogin] = React.useState(false)
  // console.log(`LOGGED IN? `, Boolean(isLoggedIn))
  // console.log('State ', store.getState())
  if (!isLoadingComplete) {
    return null
  } else {
    // if (isLoggedIn) {
      return (
        <Provider store={store}>

            {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

            <NavigationContainer linking={LinkingConfiguration} style={styles.app}>
              <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={StartScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>

        </Provider>
      )
    // }
    // else {
    //   // Test Login Screen. Needs insane beautification lmao. No padding present either. 
    //   return (
    //     <Provider store={store}>
    //       <NavigationContainer>
    //         <Stack.Navigator>

    //         </Stack.Navigator>
    //       </NavigationContainer>
    //     </Provider>
    //   )
    // }
  }
}

const styles = StyleSheet.create({
  app: {
    fontFamily : 'JosefinSans_400Regular'
  }
})
