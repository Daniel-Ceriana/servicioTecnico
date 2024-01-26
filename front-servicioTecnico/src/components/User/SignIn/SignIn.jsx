import React from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/actions/userActions";



function SignIn() {
    const dispatch = useDispatch();
    const handleSubmit= (e)=>{
      e.preventDefault();
      dispatch(signIn({email:e.target.elements.email.value,password:e.target.elements.password.value}))
  }
    return (
        <div className="SignIn">
          <h1>SignIn</h1>

        <form
        onSubmit={(e)=>{handleSubmit(e)}}>
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
  