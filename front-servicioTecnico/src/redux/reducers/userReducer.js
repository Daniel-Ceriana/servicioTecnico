import {createReducer} from '@reduxjs/toolkit'
import {signIn} from "../actions/userActions.js"

const initialState={
        fullName:"",
        email:"",
        role:""
};

const userReducer = createReducer(initialState,(builder)=>{
    return builder.addCase(signIn, (state,action)=>{

        let newStore = state
        Object.keys(action.payload).forEach((key)=>newStore[key] = action.payload[key])
        return newStore;
    })
})
export default userReducer;