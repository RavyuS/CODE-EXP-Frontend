import { connect } from 'react-redux'
import { updateReservations } from '../features/account/accountSlice'
import { useState, useEffect } from 'react'
import Axios from 'axios'

const mapStateToProps = state => ({reservations:state.account.reservations})
const mapDispatchToProps = {updateReservations}
const apiURL = ''

const PlaceInfoScreen = (props) => {

    const {reservations, updateReservations,navigation} = props
    const {compoundCode, name, vicinity} = props.route.params // example compound code "9V2C+CQ Singapore"
    const [areaCode, restOfCode ] = compoundCode.split('+') // splits compound code using "+". rest contains shop code + area info (eg., CQ Singapore), so we need to split it a second time
    const [placeCode] = restOfCode.split(' ')
    let areaSlotArray = Array.from({length:48}).fill(0) //initialize with 48 0s
    let placeSlotsArray
    const [date, setDate] = useState(toDDMMYYYY(new Date())) // always make sure u setDate with a DDMMYYYY string representation of the date

    useEffect(() => {
        Axios.get(`${apiURL}/api/location?areaCode=${areaCode}&date=${date}`)
        .then(resp =>{
            // DATA LOAD CODE
            const placesObject = resp.body.places
            placeSlotsArray = placesObject[placeCode] // need to do handling if this is missing btw!
            for(placeSlots in placesObject) {
                placeSlots.forEach((slot,index) => areaSlotArray[index] += slot )
            }
            // check if any reservations where made in this place
            const placeReservations = reservations.filter(reservation => reservation[1] === placeCode) // assumes placeCode is at index 1

        })
        .catch(err =>{
            //Error Code
            //if 
        })
    },[compoundCode,date,formSubmitted]) //will only update if compoundCode or date changes, and will refresh when after a form is submitted
    
    

}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceInfoScreen)



/**
 * 
 * @param {Date} date 
 */

const toDDMMYYYY = date => { `${date.getDate}${date.getMonth + 1}${date.getFullYear}`}