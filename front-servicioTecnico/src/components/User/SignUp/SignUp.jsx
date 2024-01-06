import React from "react";
import axios from "axios"
const BACK_BASE_URL = import.meta.env.BACK_BASE_URL || "http://localhost:4000" 

const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(e.target.elements.email.value,e.target.elements.fullName.value,e.target.elements.password.value)
    postData({email:e.target.elements.email.value,fullName:e.target.elements.fullName.value,password:e.target.elements.password.value})
}



const postData=async(formData)=>{
const userData={...formData,from:"signUp-form",aplication:"ServicioTecnico"}
const res=await axios.post(`${BACK_BASE_URL}/api/auth/signUp`,{userData})
if(!res.data.success){
    // mostrar pop up de error
    console.log(res.data.message)
}
}

function SignUp() {
    return (
        <div className="SignUp">
          <h1>SignUp</h1>

        <form
        onSubmit={(e)=>{handleSubmit(e)}}>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="fullName">Full name: </label>
                <input type="text" name="fullName" id="fullName" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="text" name="password" id="password" />
            </div>
            <button type="submit" >Submit</button>
        </form>
          
      </div>
    );
  }
  
  export default SignUp;
  