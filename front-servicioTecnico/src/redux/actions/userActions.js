import {createAsyncThunk, createAction} from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import axios from "axios"


const BACK_BASE_URL = import.meta.env.BACK_BASE_URL || "http://localhost:4000" 
const toastSettings = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
}

const sendAxios=async(formData,cb,endPoint)=>{
    try {
        const userData={...formData,from:"signUp-form",aplication:"ServicioTecnico"}
        const res=await cb(`${BACK_BASE_URL}/api/auth/${endPoint}`,{userData})
        if(!res.data.success){
            // mostrar pop up de error
            toast.error(res.data.message,toastSettings);
        }else{
            toast.success(res.data.message, toastSettings);      
        }
        return res  
    } catch (error) {
        console.log("ERROR: ",error);
        toast.error("Ocurrió un error, vuelve a intentarlo",toastSettings);
        return 0  
    }
}



const signIn = createAsyncThunk("signIn", async(data)=>{
    const {email,password} = data
    //  axios...
    if(!email.length>0 ||!password.length>0){
        return{}
    }
    try {
        const aux = axios.post;
        const res = await sendAxios({email,password},aux,"signIn")
        if(!res.data.success){
            return{}
        }else{
            localStorage.setItem("StToken",res.data.response.token)
            return {fullName:res.data.response.dataUser.fullName,
                role:res.data.response.dataUser.role};
        }
    } catch (error) {
        console.log(error)
        return{}

    }
})

const signUp = createAsyncThunk("signUp", async(data)=>{
    const {email,fullName,password} = data
    //  axios...
    if(!email.length>0 ||!password.length>0){
        return{}
    }
    try {
        const aux = axios.post;
        await sendAxios({email,fullName,password},aux,"signUp")
            return{}

    } catch (error) {
        console.log(error)
        return{}

    }
})
const updateUser = createAsyncThunk("updateUser", async(data,token)=>{
    const {email,fullName} = data
    console.log(token)
    // const id = token
    // //  axios...
    // if(!email.length>0 &&!email.length>0){
    //     return{}
    // }
    // try {
    //     const aux = axios.post;
    //     await sendAxios({email,fullName},aux,`/update/${id}`)
    //         return{}

    // } catch (error) {
    //     console.log(error)
    //     return{}

    // }
})


export {signIn,signUp,updateUser}




