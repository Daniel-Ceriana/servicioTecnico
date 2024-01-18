import {createAsyncThunk, createAction} from "@reduxjs/toolkit"
import axios from "axios"


const signIn = createAction("signIn", (data)=>{
    console.log(data)

    return data;
})


export {signIn}