import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';

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
const apiURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDlrF2T7k61EdNL_qbL3pG-95rjqYzXy-g"

export default function SearchScreen({ navigation }) {
  const [data, setData] = useState({ value: []} );
  const [placeDetails, setplaceDetails] = useState({ value: {}} )

  const searchQuery= '';
  const _onSearch = (query) => axios.get(`${apiURL}&input=${query}
    &inputtype=textquery`)
    .then(res =>{
      axios.get(`${apiURL}/details/json?key=${apiKEY}&place_id=${res["candidates"]["place_id"]}`)
        .then(res => {
          setplaceDetails({ 
            compoundCode : res.candidates.plus_code.compound_code,
            formattedAddress : res.candidates.formatted_address,
            name : res.candidates.name
          });
          setData([placeDetails]);
          navigation.navigate('PlaceInfo', placeDetails);
        })
    })

  return (
    <View style={styles.container}>
        <Searchbar 
          style={styles.search} 
          placeholder = "Search for a location"
          icon={() => <MaterialCommunityIcons name="map-search" size={30}/>}
          onChangeText = {_onSearch}
        />
        <SafeAreaView style = {{flex:12}}>
          <FlatList
            data={data}
            renderItem={({ item }) =>
              <Item 
                title = {item.compoundCode }
                onPress = {() => {
                  navigation.navigate('PlaceInfoScreen')
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
