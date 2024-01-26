import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/userActions";


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





// const postData=async(formData,token)=>{
//     try {
//         const token = localStorage.getItem("StToken")
//         if(token){
//             const userData={...formData,from:"signUp-form",aplication:"ServicioTecnico"}
//             const res=await axios.post(`${BACK_BASE_URL}/api/auth/update/${token.id}`,{userData})
//             if(!res.data.success){
//                 // mostrar pop up de error
//                 console.log(res.data.message)
//                 toast.error(res.data.message,toastSettings);
//             }
//             toast.success(res.data.message, toastSettings);
//         }    
//     } catch (error) {
//         console.log(error)
//         toast.error("Hubo un error, intente denuevo más tarde",toastSettings);

//     }
    
    
// }

function UpdateUser() {
  const dispatch= useDispatch();
  const token = localStorage.getItem("StToken");
  const handleSubmit=(e)=>{
    console.log("ASDASD")
    e.preventDefault();
    dispatch(updateUser({email:e.target.elements.email.value,fullName:e.target.elements.fullName.value},token))
    // console.log(e.target.elements.email.value,e.target.elements.fullName.value,e.target.elements.password.value)
    // postData({email:e.target.elements.email.value,fullName:e.target.elements.fullName.value},token)
}
    return ( 
        <div className="UpdateUser">
          <h1>UpdateUser</h1>

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
            <button type="submit">Submit</button>
        </form>
          
      </div>
    );
  }
  
  export default UpdateUser;
  