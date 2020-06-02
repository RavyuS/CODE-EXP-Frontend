import { connect } from 'react-redux'
import { updateReservations } from '../account/accountSlice'
import React,{ useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../../constants/URLs'
import Utils from '../../utils'
import moment from 'moment';
// import { Dropdown } from 'react-native-material-dropdown';
import PickerSelect from 'react-native-picker-select';
// import { Button } from 'react-native-paper'
import { ScrollView, View, Text, Button } from 'react-native'

const mapStateToProps = state => ({reservations:state.account.reservations})
const mapDispatchToProps = { updateReservations }

const ReservationForm = ({reservations,updateReservations,placeSlotsArray, compoundCode, date, name}) => {
    const [time, setTime] = useState({
        startTime:{value:'0000',index:0}, 
        endTime:{value:'0030',index:1}
    })
    const [pax, setPax] = useState(0)
    const [dropdownItems, setDropdownItems] = useState({})
    const [error, setError] = useState('')
    const [fakeItems, setFakeItems ] = useState('')
    // const {placeSlotsArray, compoundCode, date, name} = fakeItems
    useEffect(()=>{ // First time rendering
        const timeOptions = Utils.getTimeOptions()
        // const startDropdown = dropdownObjects
        const timeDropdown = timeOptions.map((el)=> ({label:el,value:el}))
        const paxDropdown = Array.from({ length: 10 }).fill(0).map((el,index)=> ({label:String(index+1),value:index+1})) //Maximum of 10 pax for now.
        // console.log(timeDropdown)
        setFakeItems(generateFake())
        // console.log(generateFake())
        setDropdownItems({timeDropdown,paxDropdown})
    },[])

    
    // const onValueChangeTemplate = setter => value => setter(value)
    const onStartTimeChange = (value,index) =>setTime({...time,startTime:{value,index}})

    const onEndTimeChange = (value,index) => setTime({...time,endTime:{value,index}})
    const onPaxChange = value => setPax(value)

    const onSubmit = () => {
        const startIndex = time.startTime.index
        const endIndex = time.endTime.index
        if (endIndex <= startIndex) setError('End time must be greater than start')
        else{
            const element = [name,compoundCode,date,startIndex,endIndex,pax]
            // console.log('Generates Array: ', element)
            const newReservations = [...reservations,element]
            updateReservations(newReservations)
            // console.log(reservations)
            // updateDatabase({name,compoundCode,date,startIndex,endIndex,pax})//note that pax is increment in endpoint
            setPax(0)
            setTime({
                startTime:{value:"0000",index:0}, 
                endTime:{value:"0030",index:1}
            })

        }
    }

    if (dropdownItems.timeDropdown){
    return(
        <View>
            {error ? <Text>{error}</Text> : null}
            <Text>Start Time</Text>
            <PickerSelect
                onValueChange={onStartTimeChange}
                items={dropdownItems.timeDropdown}
            />
            <Text>End Time</Text>
            <PickerSelect
                onValueChange={onEndTimeChange}
                items={dropdownItems.timeDropdown}
            />
            <Text>No. of Pax</Text>
            <PickerSelect
                onValueChange={onPaxChange}
                items={dropdownItems.paxDropdown}
            />
            {/* <View><PaxRangeMessage time={time} placeSlotsArray={placeSlotsArray}/></View> */}
            <Button 
                onPress={onSubmit}
                title="Submit"

            />
        </View>
    )
    }
    else return (<Text>Rendering..</Text>)

}

export default connect(mapStateToProps,mapDispatchToProps)(ReservationForm)

const PaxRangeMessage = ({time,placeSlotsArray}) =>{
    const startIndex = time.startTime.index
    const endIndex = time.endTime.index
    if(endIndex <= startIndex) return (<></>)
    else{
        const slicedSlots = placeSlotsArray.slice(startIndex,endIndex+1)
        const highestPax = Math.max(...slicedSlots)
        const lowestPax = Math.min(...slicedSlots)
        return (<Text>Expect {lowestPax} to {highestPax} people</Text>)
    }
}

//DELETE
const generateFake = () =>
{
    const placeSlotsArray = Array.from({ length: 48 }, () => Math.floor(Math.random()*250))
        
    // console.log(placeSlotsArray)
    return {
        placeSlotsArray,
        name:"Nex",
        compoundCode:"9V2C+CQ",
        date:"03062020"
    }

}