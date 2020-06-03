import { connect } from 'react-redux'
import { updateReservations } from '../account/accountSlice'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../../constants/URLs'
import Utils from '../../utils'
import moment from 'moment';
// import { Dropdown } from 'react-native-material-dropdown';
import PickerSelect from 'react-native-picker-select';
// import { Button } from 'react-native-paper'
import { Button } from 'react-native-paper';


import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
// import { useFonts } from '@use-expo/font';
import { 
    useFonts,
    JosefinSans_100Thin,
    JosefinSans_200ExtraLight,
    JosefinSans_300Light,
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
    JosefinSans_700Bold,
    JosefinSans_100Thin_Italic,
    JosefinSans_200ExtraLight_Italic,
    JosefinSans_300Light_Italic,
    JosefinSans_400Regular_Italic,
    JosefinSans_500Medium_Italic,
    JosefinSans_600SemiBold_Italic,
    JosefinSans_700Bold_Italic 
} from '@expo-google-fonts/josefin-sans';
import { TouchableHighlight } from 'react-native-gesture-handler'

const mapStateToProps = state => ({
    email: state.account.email,
    reservations: state.account.reservations
})
const mapDispatchToProps = { updateReservations }

const ReservationForm = ({ email,reservations, updateReservations, placeSlotsArray, compoundCode, date, name, formSubmitState }) => {
    let [fontsLoaded] = useFonts({
        JosefinSans_400Regular,
        JosefinSans_700Bold,
    });
    const [time, setTime] = useState({
        startTime: { value: '0000', index: 0 },
        endTime: { value: '0030', index: 1 }
    })
    const [pax, setPax] = useState(0)
    const [dropdownItems, setDropdownItems] = useState({})
    const [status, setStatus] = useState('')
    const {formSubmitted,setFormSubmitted } = formSubmitState

    // const [fakeItems, setFakeItems ] = useState('')
    // const {placeSlotsArray, compoundCode, date, name} = fakeItems
    useEffect(() => { // First time rendering
        const timeOptions = Utils.getTimeOptions()
        const timeDropdown = timeOptions.map((el) => ({ label: el, value: el }))
        const paxDropdown = Array.from({ length: 10 }).fill(0).map((el, index) => ({ label: String(index + 1), value: index + 1 })) //Maximum of 10 pax for now.
        // console.log(timeDropdown)
        // setFakeItems(generateFake())
        // console.log(generateFake())
        setDropdownItems({ timeDropdown, paxDropdown })
    }, [])


    // const onValueChangeTemplate = setter => value => setter(value)
    const onStartTimeChange = (value, index) => {
        console.log("TIME: ",value, " INDEX: ",index-1)
        setTime({ ...time, startTime: { value, index:index-1 } })

    }

    const onEndTimeChange = (value, index) => setTime({ ...time, endTime: { value, index:index-2 } }) // minus 2 because end time is does not include that slots itself (i.e, end time 1400, which if u index is actually the 1400-1430 slot)
    const onPaxChange = value => setPax(value)

    const onSubmit = () => {
        const startIndex = time.startTime.index
        const endIndex = time.endTime.index
        if (endIndex < startIndex) Alert.alert(null,'End time must be greater than start')
        else if (pax === 0) Alert.alert(null,"Please set a number of pax")
        else {
            const element = [name, compoundCode, date, startIndex, endIndex, pax]
            // console.log('Generates Array: ', element)
            let newReservations 
            if (reservations) newReservations = [...reservations, element]
            else newReservations = [element]
            updateReservations(newReservations)
            // console.log(newReservations)
            const { areaCode, placeCode } = Utils.splitCompoundCode(compoundCode)
            const increment = pax
            updateDatabase({ areaCode, date, placeCode, date, startIndex, endIndex, increment, email, reservations:newReservations })
                .then(Resp => {
                    // commented out till can find a way to reset timepicker, confusing when value presented to user is
                    // different from value stored (timepicker doesnt reset on submit)
                    // setPax(0)
                    // setTime({
                    //     startTime: { value: "0000", index: 0 },
                    //     endTime: { value: "0030", index: 1 }
                    // })
                    Alert.alert("Reservation submitted!","Your information will help others make their decisions!")
                    setStatus("successfully updated")
                    setFormSubmitted(formSubmitted+1)
                }) //note that pax is increment in endpoint


        }
    }

    if (dropdownItems.timeDropdown && fontsLoaded) {
        return (
            <View style={styles.container} >
                {/* below line is weird, get a better lib? */}
               


                <View style={styles.inputContainer}>
                    <View style={styles.inputElement}>
                        <Text style={{ fontFamily: 'JosefinSans_700Bold', fontSize: 20 }}>Pax</Text>
                        <PickerSelect
                            style={pickerStyle}
                            onValueChange={onPaxChange}
                            items={dropdownItems.paxDropdown}
                            placeholder={{label: "No. of pax", value: null}}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>

                    <View style={styles.inputElement}>
                        <Text style={{ fontFamily: 'JosefinSans_700Bold', fontSize: 20 }}>Start</Text>
                        <PickerSelect
                            style={pickerStyle}
                            onValueChange={onStartTimeChange}
                            items={dropdownItems.timeDropdown}
                            placeholder={{label: "Start time", value: null}}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>


                    <View style={styles.inputElement}>
                        <Text style={{ fontFamily: 'JosefinSans_700Bold', fontSize: 20 }}>End</Text>
                        <PickerSelect
                            style={pickerStyle}
                            onValueChange={onEndTimeChange}
                            items={dropdownItems.timeDropdown}
                            placeholder={{label: "End time", value: null}}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.expect}>
                        <PaxRangeMessage time={time} placeSlotsArray={placeSlotsArray} />
                    </View>

                    <View style={styles.inputElement}>
                        {/* <TouchableHighlight style={styles.button}> */}
                            <Button
                                onPress={onSubmit}
                                mode="contained"
                                style={styles.button}
                                // title="Submit"
                                // color="white"
                            >
                                SUBMIT
                            </Button>
                        {/* </TouchableHighlight> */}
                    </View>
                </View>
            </View>
        )
    }
    else return (<Text>Rendering..</Text>)

}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationForm)

const PaxRangeMessage = ({ time, placeSlotsArray }) => {
    const startIndex = time.startTime.index
    const endIndex = time.endTime.index
    
    if (endIndex < startIndex) return (<></>)
    else {
        const slicedSlots = placeSlotsArray.slice(startIndex, endIndex + 1)
        const highestPax = Math.max(...slicedSlots)
        const lowestPax = Math.min(...slicedSlots)
        if (highestPax===lowestPax) return (<Text style={styles.expectText}>Expect about {highestPax} people.</Text>)
        return (<Text style={styles.expectText}>Expect {lowestPax} to {highestPax} people.</Text>)
    }
}

//DELETE
const generateFake = () => {
    const placeSlotsArray = Array.from({ length: 48 }, () => Math.floor(Math.random() * 250))

    // console.log(placeSlotsArray)
    return {
        placeSlotsArray,
        name: "Nex",
        compoundCode: "9V2C+CQ",
        date: "03062020"
    }

}
/**
 * @param {Object} updateData
 */
const updateDatabase = updateData => {
    // const { areaCode,placeCode,date,startIndex,endIndex,increment} = updateData
    return Axios.post(`${apiURL}/api/locations`, updateData)
}

const pickerStyle = {
	inputIOS: {
		color: 'black',
        marginTop: 5,
        padding: 2,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#FFF5EB',
	},
	inputAndroid: {
		color: 'black',
        marginTop: 5,
        padding: 2,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#FFF5EB'
	}
	// placeholderColor: 'white',
	// underline: { borderTopWidth: 0 },
	// icon: {
	// 	// position: 'absolute',
	// 	backgroundColor: 'black',
	// 	borderTopWidth: 5,
	// 	borderTopColor: '#00000099',
	// 	borderRightWidth: 5,
	// 	borderRightColor: 'transparent',
	// 	borderLeftWidth: 5,
	// 	borderLeftColor: 'transparent',
	// 	width: 0,
	// 	height: 0,
	// 	top: 20,
	// 	right: 15,
	// },
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(35, 61, 77, 0.45)',
        padding: 20,
        paddingTop:5,
        // justifyContent: "center"
    },
    inputContainer: {
        // flex: 2,
        flexDirection: "row",
        alignContent: "space-around",
        justifyContent: "center"
    },
    inputElement: {
        flex: 2
    },
    expect: {
        flex: 1,
        marginTop: 20
    },
    expectText: {
        fontFamily: 'JosefinSans_400Regular',
        fontSize: 15,
        lineHeight: 25,
        top: 7,
        width:  250
    },
    selectItem: {
        backgroundColor: 'white',
        display: 'none'
    },
    button: {
        backgroundColor: '#233D4D',
        color: '#FFEBD6',
        width: 100,
        borderRadius: 10,
        left: 130,
        marginTop: 20,
        // top: 10
        // margin: 20
    }
});
