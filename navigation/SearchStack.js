import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlaceInfoScreen from '../screens/PlaceInfoScreen';

const SearchStack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function SearchStackNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <SearchStack.Navigator initialRouteName={INITIAL_ROUTE_NAME} 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#233D4D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SearchStack.Screen
        name="SearchInfo"
        component={SearchScreen}
        options={{
            title: 'Search',
        }}
        >
      </SearchStack.Screen>
      <SearchStack.Screen
        name="PlaceInfo"
        component={PlaceInfoScreen}
        options={{
            title: 'Place Information',
        }}
        >
      </SearchStack.Screen>
    </SearchStack.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Search':
      return 'Search';
    case 'PlaceInfo':
      return 'PlaceInfo';
  }
}
