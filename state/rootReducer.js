import {combineReducers} from '@reduxjs/toolkit'
import accountReducer from '../features/account/accountSlice'

export default combineReducers({
    account:accountReducer
})