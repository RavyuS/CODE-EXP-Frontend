import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import apiURL from '../constants/URLs'

import { MonoText } from '../components/StyledText';
import store from '../state/store';
import { TextInput, Searchbar, Button } from 'react-native-paper';

function Item({ title }) {
  return (
    <View style = {styles.listItem}>
      <Text style= {styles.title}>{title}</Text>
    </View>
  )
}

export default function SearchScreen({ navigation }) {
  const [data, setData] = useState([{ 
    compoundCode : "9V2C+CQ Singapore",
    formattedAddress : "23 Serangoon Central, #03-42 Nex Mall, Singapore 556083",
    name : "FairPrice Xtra Nex Mall"
  }]);
  let placeDetails
  const [searchText, setSearchText] = useState("")

  _onSearch = () => axios.get(`${apiURL}/api/googleapi?name=${searchText}`)
    .then(res =>{
      console.log(res);
      placeDetails = { 
        compoundCode : res.data.candidates[0].plus_code.compound_code,
        formattedAddress : res.data.candidates[0].formatted_address,
        name : res.data.candidates[0].name
      };
      setData([placeDetails]);
      console.log(navigation)
      navigation.navigate('PlaceInfo', placeDetails);
    }).catch(error =>{
      console.log(error);
    });

  return (
    <View style={styles.container}>
        <Searchbar 
          style={styles.search} 
          placeholder = "Search for a location"
          icon={() => <MaterialCommunityIcons name="map-search" size={30}/>}
          onChangeText = {(value) => setSearchText(value)}
        />
        <Button icon="search" onPress={this._onSearch}>
          Submit
        </Button>
        <SafeAreaView style = {{flex:12}}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <Item 
                title = {item.compoundCode}
                onPress = {() => {
                  navigation.navigate('PlaceInfo')
                }}
              />
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
    padding: 10
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
