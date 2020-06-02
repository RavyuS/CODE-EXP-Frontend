import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

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
const apiURL = "https://maps.googleapis.com/maps/api/place"
const apiKEY = "AIzaSyDlrF2T7k61EdNL_qbL3pG-95rjqYzXy-g"

export default function SearchScreen({ navigation }) {
  const [data, setData] = useState({ value: []} );

  const searchQuery= '';
  _onSearch = (query) => axios.get(`${apiURL}/findplacefromtext/json?key=${apiKEY}&input=${query}
    &inputtype=textquery`)
    .then(res =>{
      axios.get(`${apiURL}/details/json?key=${apiKEY}&place_id=${res["candidates"]["place_id"]}`)
        .then(res => {
          setData({...data});
        })
    })

  return (
    <View style={styles.container}>
        <Searchbar 
          style={styles.search} 
          placeholder = "Search for a location"
          icon={() => <MaterialCommunityIcons name="map-search" size={30}/>}
          onChangeText = {this._onSearch}
        />
        <SafeAreaView style = {{flex:12}}>
          <FlatList
            data={React.useState}
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
