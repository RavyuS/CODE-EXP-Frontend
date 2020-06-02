import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import store from '../state/store';

export default function ProfileScreen() {
  return (
    <View style={styles.userInfo}>
        <View style={styles.avatarWrapper}>
            <Image
                source={require('../assets/images/avatar.png')}
                style={styles.avatarImg}
            />
        </View>

        <View style={styles.infoWrapper}>
            <Text style={styles.name}>Rohit</Text>
            <Text style={styles.job}>rohit@gmail.com</Text>
        </View>


        <View style={styles.reservations}>
            <Text style={styles.reservationsHeader}>
                Reservations
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    userInfo: {
      flex: 1,
      flexDirection: "row",
      marginLeft: 40
    },  
    avatarWrapper: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 500
    },
    infoWrapper: {
      flex: 2,
      marginTop: 90
    },
    avatarImg: {
      height: 120,
      width: 120
    },
    name: {
      fontWeight: "bold",
      fontSize: 36
    },
    job: {
      color: "#949494",
    },
    reservations: {
        flex: 1,
        position: "absolute",
        top: 200,
        justifyContent: "space-between"
    },
    reservationsHeader: {
        fontSize: 36,
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto"
    }
  });
