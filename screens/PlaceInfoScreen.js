import { connect } from 'react-redux'
// import { updateReservations } from '../features/account/accountSlice'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../constants/URLs'
import { ScrollView, View, Text } from 'react-native'
import { BarChart, YAxis, Grid } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import Utils from '../utils'
const mapStateToProps = state => ({ reservations: state.account.reservations })



const PlaceInfoScreen = (props) => {

    const { reservations, navigation } = props
    const { compoundCode, name, vicinity } = props.route.params // example compound code "9V2C+CQ Singapore"
    const [areaCode, restOfCode] = compoundCode.split('+') // splits compound code using "+". rest contains shop code + area info (eg., CQ Singapore), so we need to split it a second time
    const [placeCode] = restOfCode.split(' ')

    const [date, setDate] = useState(new Date()) // always make sure u setDate with a DDMMYYYY string representation of the date
    const dateQuery = Utils.toDDMMYYYY(date) //for queries since we store date in DDMMYYYY
    const [renderedData, setRenderedData] = useState('')

    useEffect(() => {
        Axios.get(`${apiURL}/api/locations?areaCode=${areaCode}&date=${dateQuery}`)
            .then(resp => {
                // DATA LOAD CODE
                // console.log(resp.data.Item)
                const placesObject = resp.data.Item.places
                let areaSlotArray = Array.from({ length: 48 }).fill(0) //initialize with 48 0s
                const placeSlotsArray = placesObject[placeCode] || Array.from({ length: 48 }).fill(0) //if Place is not in item, then generate an array with 48 indexes
                for (const placeSlots in placesObject) {
                    placesObject[placeSlots].forEach((slot, index) => areaSlotArray[index] += slot)
                }
                // check if any reservations where made in this place
                const placeReservations = reservations.filter(reservation => reservation[1] === compoundCode && reservation[2] === dateQuery) // assumes compoundCode is at index 1
                const barChartData = slotsToData(placeSlotsArray)
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
    }, [compoundCode, date]) //will only update if compoundCode or date changes, and will refresh when after a form is submitted
    if (!renderedData) return (
        <Text>Rendering</Text>
    )
    else return (
        <View style={{ flex: 1 }}>
            <Text>{name}</Text>
            <Text>{vicinity}</Text>
            <Text>{date.toDateString()}</Text>
            <ScrollView>
                <Text>Your reservations:</Text>
                <ReseservationList placeReservations={renderedData.placeReservations} />
                <SlotsBarChart barChartData={renderedData.barChartData} />
            </ScrollView>

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

    for (let i = 7; i < 21; i++) {
        const index = i * 2 + 1
        let value
        placeArray[index] > placeArray[index + 1] ? value = placeArray[index] : value = placeArray[index + 1]
        data.push({ value, label: `${i + 1}:00` })
    }
    // console.log(data)
    return data;

}

const ReseservationList = ({placeReservations}) => {
    if (placeReservations[0]) {
        const dataSource = placeReservations.map((el) => ({
            'location': el[0],
            'date': el[2],
            'reserved': Utils.getTimeRange(el[3], el[4])
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
            >

            </BarChart>
        </View>
    )
}

