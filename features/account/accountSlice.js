import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
	name:'account',
	initialState: {},
	reducers : {
		setAccountDetails: (state, action) => {
            const {email,name,reservations} = action.payload
            // console.log("STATE IN REDUCE ",state)
            return {email,name,reservations}  
		},
		updateReservations: (state, action) => { // action.payload is reservations array
			return {...state,
				reservations: action.payload
			}
		}
	},

})

// action.payload is a standardization of the action object structure (since we don't need to specify the 'type' property anymore, we can simplify it to just the payload.) The FSA convention suggests that rather than having data fields with random names directly in the action object, you should always put your data inside a field named payload.
// named export for actions, default export reducer. AKA "ducks" pattern https://github.com/erikras/ducks-modular-redux

export const {setAccountDetails, updateReservations} = accountSlice.actions
export default accountSlice.reducer