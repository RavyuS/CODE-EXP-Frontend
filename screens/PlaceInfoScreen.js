import { connect } from 'react-redux'
// import { updateReservations } from '../features/account/accountSlice'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../constants/URLs'
import { ScrollView, View, Text, Button, StyleSheet } from 'react-native'
import { BarChart, YAxis, Grid } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import Utils from '../utils'
import ReservationForm from '../features/placeInfo/ReservationForm'
import Table from 'react-native-simple-table';
// import { Button } from 'react-native-paper'
const mapStateToProps = state => ({ reservations: state.account.reservations })



const PlaceInfoScreen = (props) => {

    const { reservations, navigation } = props
    const { compoundCode, name, vicinity } = props.route.params // example compound code "9V2C+CQ Singapore"

    const { areaCode, placeCode } = Utils.splitCompoundCode(compoundCode)

    const [date, setDate] = useState(new Date()) // always make sure u setDate with a DDMMYYYY string representation of the date
    const dateQuery = Utils.toDDMMYYYY(date) //for queries since we store date in DDMMYYYY
    const [renderedData, setRenderedData] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(0)

    useEffect(() => {
        Axios.get(`${apiURL}/api/locations?areaCode=${areaCode}&date=${dateQuery}`)
            .then(resp => {
                let placesObject = {}
                resp.data.Item ? placesObject = resp.data.Item.places : null
                let areaSlotArray = Array.from({ length: 48 }).fill(0) //initialize with 48 0s
                const placeSlotsArray = placesObject[placeCode] || Array.from({ length: 48 }).fill(0) //if Place is not in item, then generate an array with 48 indexes
                if (placesObject.Item) {
                    for (const placeSlots in placesObject) {
                        placesObject[placeSlots].forEach((slot, index) => areaSlotArray[index] += slot)
                    }
                }
                let placeReservations = []

                if (reservations) {
                    placeReservations = reservations.filter(reservation => reservation[1] === compoundCode && reservation[2] === dateQuery) // assumes compoundCode is at index 1
                }

                // console.log(placeReservations)
                const barChartData = slotsToData(placeSlotsArray)
                // console.log(placeSlotsArray)
                // console.log("last part before rerender")
                setRenderedData({
                    placeSlotsArray,
                    areaSlotArray,
                    placeReservations,
                    barChartData
                })

            })
            .catch(err => {
                //Error Code
                //if item doesn't exist (aka 404 code returned)
            })
    }, [compoundCode, date, formSubmitted]) //will only update if compoundCode or date changes, and will refresh when after a form is submitted
    if (!renderedData) return (
        <Text>Rendering</Text>
    )
    else return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text>{name}</Text>
                <Text>{vicinity}</Text>
                <Text>{date.toDateString()}</Text>
            </View>
            <ScrollView style={{ flex: 2 }}>
                <Text>Your reservations:</Text>
                <ReseservationList placeReservations={renderedData.placeReservations} />
                <SlotsBarChart barChartData={renderedData.barChartData} />
            </ScrollView>
            <ReservationForm
                placeSlotsArray={renderedData.placeSlotsArray}
                name={name}
                compoundCode={compoundCode}
                date={dateQuery}
                formSubmitState={{ formSubmitted, setFormSubmitted }}

            />

        </View>
    )


}

export default connect(mapStateToProps)(PlaceInfoScreen)



/**
 * 
 * @param {Date} date 
 */




// Consolidates data in hourly windows for BarChart to render hours between 0800H to 2200H
const slotsToData = (placeArray) => {
    let data = []

    for (let i = 8; i < 22; i++) {
        const index = i * 2 
        let value
        placeArray[index] > placeArray[index + 1] ? value = placeArray[index] : value = placeArray[index + 1]
        data.push({ value, label: `${i}:00` })
    }
    // console.log(data)
    return data;

}

const ReseservationList = ({ placeReservations }) => {
    // console.log(placeReservations[0])
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
    if (placeReservations[0]) {
        const dataSource = placeReservations.map((el) => ({
            'location': el[0],
            'date': el[2][0]+el[2][1]+'/'+el[2][2]+el[2][3]+'/'+el[2][4]+el[2][5]+el[2][6]+el[2][7],
            'reserved': Utils.getTimeRange(el[3], el[4]),
            'number': el[5]
        }))

        return (
            <View style={styles.tableContainer}>
                <Table bodyStyle={styles.table} height={320} columnWidth={60} columns={columns} dataSource={dataSource} />
            </View>
        )
    }
    else return (<Text>None.</Text>)
}


const SlotsBarChart = ({ barChartData }) => {
    return (
        <View style={{ flexDirection: 'row', height: 800, paddingVertical: 16, paddingRight: 20, paddingLeft: 5 }}>
            <YAxis
                data={barChartData}
                yAccessor={({ index }) => index}
                svg={{ fill: '#000000' }}
                scale={scale.scaleBand}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                formatLabel={(_, index) => barChartData[index].label}
            />
            <BarChart
                style={{ flex: 1, marginLeft: 8 }}
                data={barChartData}
                horizontal={true}
                yAccessor={({ item }) => item.value}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                gridMin={0}
            />


        </View>
    )
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