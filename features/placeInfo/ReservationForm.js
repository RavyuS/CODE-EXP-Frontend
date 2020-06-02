import { connect } from 'react-redux'
import { updateReservations } from '../account/accountSlice'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import apiURL from '../../constants/URLs'

const mapDispatchToProps = { updateReservations }

const ReservationForm = ({updateReservations,areaSlotsArray}) => {
    useEffect(()=>{
        const dropdownObjects = generateOptionsArray()
    },[])

}

const generateOptionsArray = () => {
    let array = []
    for (let i = 0, i<48, i++){
        
    }
}