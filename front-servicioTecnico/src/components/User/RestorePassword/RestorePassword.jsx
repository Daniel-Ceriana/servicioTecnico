import React from "react";
import axios from "axios"
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
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
const BACK_BASE_URL = import.meta.env.BACK_BASE_URL || "http://localhost:4000" 

const handleSubmit=(e,uniqueString2)=>{
    e.preventDefault();
    // console.log(e.target.elements.email.value,e.target.elements.fullName.value,e.target.elements.password.value)
    postData({password:e.target.elements.password.value},uniqueString2)
}



const postData=async(formData,uniqueString2)=>{
    const res=await axios.post(`${BACK_BASE_URL}/api/auth/RestorePassword`,{...formData,uniqueString2})
    if(!res.data.success){
        // mostrar pop up de error
        console.log(res.data.message)
        toast.error(res.data.message,toastSettings);

    }
    console.log(res.data.response.token)
    toast.success(res.data.message, toastSettings);
    
}

function RestorePassword() {
    const routeParams = useParams(); 

    return (
        <div className="RestorePassword">
          <h1>RestorePassword</h1>

        <form
        onSubmit={(e)=>{handleSubmit(e,routeParams.uniqueString)}}>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" name="password" id="password" />
            </div>
            <button type="submit" >Submit</button>
        </form>
          
      </div>
    );
  }
  
  export default RestorePassword;