import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { MonoText } from '../components/StyledText';
import store from '../state/store';
import { TextInput, Searchbar } from 'react-native-paper';

function Item({ title }) {
  return (
    <View style = {styles.listItem}>
      <Text style= {styles.title}>{title}</Text>
    </View>
  )
}

export default function SearchScreen() {
  const data = [
    {
      compound_code: "1234"
    },
    {
      compound_code: "1234"
    },
    {
      compound_code: "1234"
    },
  ];
  return (
    <View style={styles.container}>
        <Searchbar 
          style={styles.search} 
          placeholder = "Search for a location"
          icon={() => <MaterialCommunityIcons name="map-search" size={30}/>}
        />
        <SafeAreaView style = {{flex:12}}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <Item title = {item.compound_code}/>
            }
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 100
  }, 
  search : {
    padding : 0,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 36
  },
  listItem: {
    marginHorizontal: 32,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
