import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import store from '../state/store';
import Table from 'react-native-simple-table';

export default function ProfileScreen() {

    const columns = [
        {
            title: 'Location',
            dataIndex: 'location',
            width: 130
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: 100
        },
        {
            title: 'Reserved',
            dataIndex: 'reserved',
            width: 100
        }
    ];

    // store.account.transaction.forEach() entry into format below
    const dataSource = [
        {
            'location': 'JCube',
            'date': '02/06/2020',
            'reserved': '1130 - 2300'
        }
    ];

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

                <View style={styles.tableContainer}>
                    <Table bodyStyle={styles.table} height={320} columnWidth={60} columns={columns} dataSource={dataSource} />
                </View>
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
        position: "relative"
    },
    tableContainer: {
        ...Platform.select({
          ios: {
            paddingTop: 20
          },
          android: {}
        })
    }
  });
