import React from "react";

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e)
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
  