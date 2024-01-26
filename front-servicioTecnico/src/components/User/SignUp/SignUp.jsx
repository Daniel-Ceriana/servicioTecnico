import React from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUp } from "../../../redux/actions/userActions";



function SignUp() {
    const dispatch = useDispatch();
    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(signUp({fullName:e.target.elements.fullName.value,email:e.target.elements.email.value,password:e.target.elements.password.value}))
    }
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
  