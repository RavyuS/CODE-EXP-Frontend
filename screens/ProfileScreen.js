import * as React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Table from 'react-native-simple-table';
import { connect } from 'react-redux';
import Utils from '../utils';

const mapStateToProps = (state) => ({ reservations: state.account.reservations })

const ProfileScreen = (props) => {
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

    // reservation = [[ShopName, ShopCode, Date, startIndex, endIndex Number],...]
    const reservations =  [["Jcube", "FK", "11/23/2021", 0, 2], ["Changi priosn", "YOU", "11/23/2013", 23, 35]]
    // change below to props.reservations once store has data
    const dataSource = reservations.map((el) => ({
        'location': el[0],
        'date': el[2],
        'reserved': Utils.getTimeRange(el[3], el[4])
    }));

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

export default connect(mapStateToProps)(ProfileScreen);
