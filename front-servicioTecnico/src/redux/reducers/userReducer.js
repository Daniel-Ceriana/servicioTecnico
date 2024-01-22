import {createReducer} from '@reduxjs/toolkit'
import {signIn,signUp} from "../actions/userActions.js"

const initialState={
        fullName:"",
        email:"",
        role:""
};

const userReducer = createReducer(initialState,(builder)=>{
    return builder.addCase(signIn.fulfilled, (state,action)=>{

        let newStore = state
        Object.keys(action.payload).forEach((key)=>newStore[key] = action.payload[key])
        return newStore;
    })
    .addCase(signUp.fulfilled, (state,action)=>{
        let newStore = state
        return newStore;
    })
})
export default userReducer;