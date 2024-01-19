import React from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/actions/userActions";
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


const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(e.target.elements.email.value,e.target.elements.fullName.value,e.target.elements.password.value)
    postData({email:e.target.elements.email.value,password:e.target.elements.password.value})
}



const postData=async(formData)=>{

    const userData={...formData,from:"signUp-form",aplication:"ServicioTecnico"}
    const res=await axios.post(`${BACK_BASE_URL}/api/auth/SignIn`,{userData})
    if(!res.data.success){
        // mostrar pop up de error
        console.log(res.data.message)
        toast.error(res.data.message,toastSettings);
    }
    console.log(res.data.response.token)
    toast.success(res.data.message, toastSettings);
}

function SignIn() {
    const dispatch = useDispatch();
  const handleSubmit1= (e)=>{
      handleSubmit(e)
      console.log("AAA")
      dispatch(signIn("asd"))
  }
    return (
        <div className="SignIn">
          <h1>SignIn</h1>

        <form
        onSubmit={(e)=>{handleSubmit1(e)}}>
            <div>
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" id="email" />
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
  
  export default SignIn;
  