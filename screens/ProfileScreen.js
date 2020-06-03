import * as React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import Table from 'react-native-simple-table';
import { connect } from 'react-redux';
import Utils from '../utils';

const mapStateToProps = (state) => ({ account: state.account })

const ProfileScreen = ({account}) => {
    const columns = [
        {
            title: 'Location',
            dataIndex: 'location',
            width: 140
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: 90
        },
        {
            title: 'Reserved',
            dataIndex: 'reserved',
            width: 90
        },
        {
            title: 'Pax',
            dataIndex: 'number',
            width: 30
        },
    ];

    const dataSource = account.reservations.map((el) => ({
        'location': el[0],
        'date': el[2][0]+el[2][1]+'/'+el[2][2]+el[2][3]+'/'+el[2][4]+el[2][5]+el[2][6]+el[2][7],
        'reserved': Utils.getTimeRange(el[3], el[4]),
        'number': el[5]
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
                <Text style={styles.name}>{account.name}</Text>
                <Text style={styles.job}>{account.email}</Text>
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
      marginLeft: 30
    },  
    avatarWrapper: {
      flex: 2,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 500
    },
    infoWrapper: {
      flex: 2,
      marginTop: 130
    },
    avatarImg: {
      height: 120,
      width: 120
    },
    name: {
      fontWeight: "bold",
      fontSize: 30
    },
    job: {
      color: "#949494",
    },
    reservations: {
        flex: 1,
        position: "absolute",
        top: 250,
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
        }),
    }
  });

export default connect(mapStateToProps)(ProfileScreen);
