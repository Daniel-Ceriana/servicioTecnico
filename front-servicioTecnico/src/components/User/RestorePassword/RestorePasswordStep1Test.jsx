import React from "react";
import axios from "axios"
import { useParams } from "react-router-dom";

const BACK_BASE_URL = import.meta.env.BACK_BASE_URL || "http://localhost:4000" 

const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(e.target.elements.email.value,e.target.elements.fullName.value,e.target.elements.password.value)
    postData({email:e.target.elements.email.value})
}



const postData=async(formData)=>{
    const res=await axios.get(`${BACK_BASE_URL}/api/auth/RestorePassword?email=${formData.email}`)
    if(!res.data.success){
        // mostrar pop up de error
        console.log(res.data.message)
    }
    console.log(res.data.response.token)
    
}

function RestorePasswordTEST() {

    return (
        <div className="RestorePassword">
          <h1>RestorePassword Step 1 test</h1>

        <form
        onSubmit={(e)=>{handleSubmit(e)}}>
            <div>
                <label htmlFor="email">email: </label>
                <input type="email" name="email" id="email" />
            </div>
            <button type="submit" >Submit</button>
        </form>
          
      </div>
    );
  }
  
  export default RestorePasswordTEST;