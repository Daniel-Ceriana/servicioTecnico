const options=(uniqueString)=>{
return{subject:"Verify Email",
html:`<div style="display: flex;  flex-direction: column;  align-items: center;background-color: #ffc16f ; margin: 10rem;">
<h1 style="color: white;font-family: monospace;"> Haz click<a style="text-decoration: none; color: gray; font-family:monospace;" href=${process.env.BACK_BASE_URL}/api/auth/verifyEmail/${uniqueString}> Aquí </a> para validar tu cuenta</h1>

<p style="color: white; font-family: monospace; font-size: 1.2rem;"> Hemos recibido una solicitud de confirmación de email para tu cuenta de Servicio Tecnico.<p/>
</div>`}    
}

module.exports=options;