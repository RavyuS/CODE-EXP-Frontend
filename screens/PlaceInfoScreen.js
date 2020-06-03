import { connect } from 'react-redux'
// import { updateReservations } from '../features/account/accountSlice'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../constants/URLs'
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native'

import { BarChart, YAxis, Grid } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import Utils from '../utils'
import ReservationForm from '../features/placeInfo/ReservationForm'
import Table from 'react-native-simple-table';
import { Colors } from 'react-native/Libraries/NewAppScreen'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';

// import { Button } from 'react-native-paper'
const mapStateToProps = state => ({ reservations: state.account.reservations })



const PlaceInfoScreen = (props) => {

    const { reservations, navigation } = props
    const { compoundCode, name, formattedAddress } = props.route.params // example compound code "9V2C+CQ Singapore"
    const windowWidth = useWindowDimensions().width
    const windowHeight = useWindowDimensions().height
    const { areaCode, placeCode } = Utils.splitCompoundCode(compoundCode)
    const [showCalendar, setShowCalendar]=useState(false)
    const [date, setDate] = useState(new Date()) // always make sure u setDate with a DDMMYYYY string representation of the date
    const dateQuery = Utils.toDDMMYYYY(date) //for queries since we store date in DDMMYYYY
    
    console.log(date)
    const [renderedData, setRenderedData] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(0)

    const calendarSetDate = (event, date) => {
        setShowCalendar(false)
        date ? setDate(date):null
        
    }

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
        <View >
            <View style={styles.scrollView}>
                <ScrollView style={{ flex: 8 }}>
                    <View style={{flex:1}}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.address}>{formattedAddress}</Text>
                        {/* <Text>{date.toDateString()}</Text> */}
                        <View style={{padding:10}}/>
                        <Button onPress={()=>setShowCalendar(true)} mode='contained' style={{marginLeft:'auto',marginRight:'auto'}} color='#233D4D'>
                            {date.toDateString()}
                        </Button>
                        
                        {showCalendar && (<DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            minimumDate={new Date()}
                            onChange={calendarSetDate}
                        />)}

                    </View>
                    <SlotsBarChart barChartData={renderedData.barChartData} />
                    <Text style={styles.reservationsHeader}>Your reservations:</Text>
                    <ReseservationList placeReservations={renderedData.placeReservations} />
                    
                </ScrollView>
            </View>
            <View style={{ flex: 5 }}>
                <ReservationForm
                    placeSlotsArray={renderedData.placeSlotsArray}
                    name={name}
                    compoundCode={compoundCode}
                    date={dateQuery}
                    formSubmitState={{ formSubmitted, setFormSubmitted }}
                />
            </View>
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

    for (let i = 0; i < 24; i++) {
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
            'date': el[2][0] + el[2][1] + '/' + el[2][2] + el[2][3] + '/' + el[2][4] + el[2][5] + el[2][6] + el[2][7],
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
                svg={{ fill: '#EE964B' }}
                contentInset={{ top: 10, bottom: 10 }}
                spacing={0.2}
                gridMin={0}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    tableContainer: {
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
            android: {}
        }),
        padding: 30
    },
    name: {
        fontWeight: "bold",
        fontSize: 36,
        textAlign: "center",
        color: "#233D4D"
    },
    address: {
        textAlign: "center",
        fontStyle: "italic",
        color: "darkgrey",
        fontSize: 16,

    },
    reservationsHeader: {
        fontSize: 24,
        position: "relative",
        fontWeight: "bold",
        color: "#233D4D"
    },
    calendarButton:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign:'center'
    },
    scrollView: {
        height: '90%',
        
    }
});