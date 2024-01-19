import {createAsyncThunk, createAction} from "@reduxjs/toolkit"
import axios from "axios"


const signIn = createAction("signIn", (data)=>{
    console.log(data)

    return {payload:{fullName:"NOMBRE ALGO",
                        role:"ADMIN"}};
})


export {signIn}