import {createReducer} from '@reduxjs/toolkit'
import {signIn} from "../actions/userActions"

const initialState={
    user:undefined
};

const userReducer = createReducer(initialState,(builder)=>{
    return builder.addCase(signIn, (state,action)=>{
        console.log(action)
        const newStore = {...state,user:action.payload.user}
        return newStore;
    })
})
export default userReducer;