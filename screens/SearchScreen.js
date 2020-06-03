import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import apiURL from '../constants/URLs'
import { connect } from 'react-redux'

import { Searchbar } from 'react-native-paper';


const mapStateToProps = state => ({ reservations: state.account.reservations })

function SearchScreen({ navigation, reservations }) {
  
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
    }).catch(error => { 
      console.log(error)
      Alert.alert('No results!','Please try another query!')
    }
    );

  const onSelect = (item) => {
    console.log(reservations);
    navigation.navigate('PlaceInfo', item)
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "18%"
        }}
      />
    );
  };

  const renderHeader = () => {
    return(
      <Text style={styles.listTitle}> Your History </Text>
    )
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
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          data={history}
          ItemSeparatorComponent = {renderSeparator}
          ListHeaderComponent = {renderHeader}
          renderItem={({ item }) => 
              <TouchableOpacity
                onPress={() => onSelect(item)}
                style={styles.touchableOpacity}>
                <MaterialIcons name="place" size={40} color="green" style={styles.icon} />
                <View style = {{width:'90%', alignItems:'flex-start'}}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.address}>{item.formattedAddress}</Text>
                </View>
              </TouchableOpacity>
          }
          keyExtractor={item => item.name}
        />
      </SafeAreaView>
      <Text style={styles.disclaimer}>Disclaimer: For demonstration purposes, we have pre-populated the above data. Please view them as they demonstrate the app best.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  search: {
    flex: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft : 22
  },
  address: {
    fontSize: 16,
    marginLeft : 22
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listTitle: {
    height : '100%',
    textAlign : 'center',
    justifyContent : 'center',
    alignItems : 'baseline',
    flex: 0.5,
    fontSize: 19,
    fontWeight : 'bold',
    paddingTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // textDecorationLine : 'underline'
  },
  touchableOpacity : {
    flex:1,
    flexDirection : 'row',
    justifyContent:'flex-start',
    padding:10,
    marginVertical : 10,
  },
  safeAreaView : {
    flex : 15,
    marginTop : -40,
    marginBottom : -20,
    color: "#233D4D",
  },
  icon : {
    alignSelf:'center',
  },
  disclaimer : {
    color:'#233D4D',
    textAlign:'center', 
    marginTop:-5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  }
});

export default connect(mapStateToProps)(SearchScreen)

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