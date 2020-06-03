import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import apiURL from '../constants/URLs'

import { MonoText } from '../components/StyledText';
import store from '../state/store';
import { TextInput, Searchbar, Button } from 'react-native-paper';

function Item({ address, title, onSelect }) {

}


export default function SearchScreen({ navigation }) {
  let placeDetails = {};
  // once we set up history in store, no need to declare placedetails early
  const [history, setHistory] = useState(preparedPlaces);
  const [searchText, setSearchText] = useState("")

  const _onSearch = () => axios.get(`${apiURL}/api/googleapi?name=${searchText}`)
    .then(res => {
      placeDetails = {
        compoundCode: res.data.candidates[0].plus_code.compound_code,
        formattedAddress: res.data.candidates[0].formatted_address,
        name: res.data.candidates[0].name
      };
      if (!history.includes([placeDetails])) {
        setHistory(history => [placeDetails].concat(history));
      }
      navigation.navigate('PlaceInfo', placeDetails);
    }).catch(error => { console.log(error) }
    );

  const onSelect = (item) => {
    console.log(item);
    navigation.navigate('PlaceInfo', item)
  }

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search for a location"
        icon={() => <MaterialCommunityIcons name="map-search" size={30} />}
        onChangeText={(value) => setSearchText(value)}
        onIconPress={_onSearch}
      />
      <Text style={styles.listTitle}> Past Searches </Text>
        <SafeAreaView style={{flex:12}}>
          <FlatList
            data={history}
            renderItem={({ item }) => 
                <TouchableOpacity
                  onPress={() => onSelect(item)}
                  style={{ backgroundColor: '#f9c2ff', flex:1}}>
                  <View style = {{flexDirection: 'row', width:'90%'}}>
                    <MaterialIcons name="place" size={24} color="black" />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <Text style={styles.address}>{item.formattedAddress}</Text>
                </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        <Text style={{color:'#233D4D',textAlign:'center'}}>The above list is supposed to represent a user's search history. However, for demonstration, we use a predefined list of places. Please view them as they demonstrate the app best.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  search: {
    padding: 0,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 36
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listTitle: {
    width : '100%',
    textAlign : 'center',
    justifyContent : 'center',
    display: 'flex',
    fontSize: 16,
    paddingTop: 4,
  },
});


const preparedPlaces = [
  {
    compoundCode: "9V2C+CQ Singapore",
    formattedAddress: "23 Serangoon Central, #03-42 Nex Mall, Singapore 556083",
    name: "FairPrice Xtra Nex Mall"
  },
  {
    compoundCode: "7RRW+7C Singapore",
    formattedAddress: "Clark Quay, Singapore",
    name: "Zouk Singapore"
  },
  {
    compoundCode: "CQ3V+P6 Singapore",
    formattedAddress: "Mandai, Singapore",
    name: "Singapore Zoo"
  },
  {
    compoundCode: "9V5P+Q3 Singapore",
    formattedAddress: "Heartland Mall, Singapore",
    name: "Safarees The Barbershop Heartland Mall"
  },
  {
    compoundCode: "9V2C+9R Singapore",
    formattedAddress: "Nex, Singapore",
    name: "Koi Nex"
  },
  {
    compoundCode: "7VJ7+JC Singapore",
    formattedAddress: "Singapore",
    name: "Gardens by the Bay"   
  },
  {
    compoundCode: "7VP5+4P Singapore",
    formattedAddress: "Singapore",
    name: "Marina Bay Sands Garden Park"  
  }

]