const options={subject:"Verify Email",
html:`<div style="display: flex;  flex-direction: column;  align-items: center;background-color: #ffc16f ; margin: 10rem;">
<img src="https://i.ibb.co/bbhkHtH/logo-Sin-Fondo.png" width="100px" alt="logo">
<h1 style="color: white;font-family: monospace;"> Haz click<a style="text-decoration: none; color: gray; font-family:monospace;" href=http://localhost:4000/api/auth/verifyEmail/${uniqueString}> Aquí </a> para validar tu cuenta</h1>

<p style="color: white; font-family: monospace; font-size: 1.2rem;"> Hemos recibido una solicitud de confirmación de email para tu cuenta de Gluttony.<p/>
</div>`}

module.exports=options;