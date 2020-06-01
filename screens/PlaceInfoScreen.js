import { connect } from 'react-redux'
import { updateReservations } from '../features/account/accountSlice'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../constants/URLs'
import { ScrollView, View } from 'react-native'

const mapStateToProps = state => ({reservations:state.account.reservations})
const mapDispatchToProps = {updateReservations}


const PlaceInfoScreen = (props) => {

    const {reservations, updateReservations,navigation} = props
    const {compoundCode, name, vicinity} = props.route.params // example compound code "9V2C+CQ Singapore"
    const [areaCode, restOfCode ] = compoundCode.split('+') // splits compound code using "+". rest contains shop code + area info (eg., CQ Singapore), so we need to split it a second time
    const [placeCode] = restOfCode.split(' ')
    
    const [date, setDate] = useState(toDDMMYYYY(new Date())) // always make sure u setDate with a DDMMYYYY string representation of the date
    const [renderedData, setRenderedData ] = useState('')

    useEffect(() => {
        Axios.get(`${apiURL}/api/locations?areaCode=${areaCode}&date=${date}`)
        .then(resp =>{
            // DATA LOAD CODE
            const placesObject = resp.body.places
            let areaSlotArray = Array.from({length:48}).fill(0) //initialize with 48 0s
            const placeSlotsArray = placesObject[placeCode] || Array.from({length:48}).fill(0) //if Place is not in item, then generate an array with 48 indexes
            for(placeSlots in placesObject) {
                placeSlots.forEach((slot,index) => areaSlotArray[index] += slot )
            }
            
            // check if any reservations where made in this place
            const placeReservations = reservations.filter(reservation => reservation[1] === placeCode) // assumes placeCode is at index 1
            const barChartData = slotsToData(placeSlotsArray)

            setRenderedData({
                placeSlotsArray,
                areaSlotArray,
                placeReservations,
                barChartData
            })

        })
        .catch(err =>{
            //Error Code
            //if item doesn't exist (aka 404 code returned)
        })
    },[compoundCode,date,formSubmitted]) //will only update if compoundCode or date changes, and will refresh when after a form is submitted
    if(!renderedData) return (
        <Text>Rendering</Text>
    )
    else return(
        <View style={{flex:1}}>
            <ScrollView>

            </ScrollView>
            <IntentForm />
        </View>
    )
    

}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceInfoScreen)



/**
 * 
 * @param {Date} date 
 */

export const toDDMMYYYY = date => { `${date.getDate}${date.getMonth + 1}${date.getFullYear}`}


// Consolidates data in hourly windows for BarChart to render hours between 0800H to 2200H
const slotsToData = (placeArray) => {
    let data = []
    
    for (let i = 7; i<21; i++){
        const index = i*2+1
        let numberOfPax
        placeArray[index] > placeArray[index+1] ? numberOfPax = placeArray[index] : numberOfPax = placeArray[index+1]
        data.push({numberOfPax,slot:`${index+1}:00`})
    }
    return data;
}