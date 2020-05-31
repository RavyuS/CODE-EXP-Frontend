import {combineReducers} from '@reduxjs/toolkit'
import accountReducer from '../account/accountSlice'

export default combineReducers({
    account:accountReducer
})