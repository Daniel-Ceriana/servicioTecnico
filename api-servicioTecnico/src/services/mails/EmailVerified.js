const options=(name)=>{
    return{subject:"Email verified",
    html:`<div style="display: flex;  flex-direction: column;  align-items: center;background-color: #ffc16f ; margin: 10rem;">
    <h1>Hola ${name}</h1>
    <h2 style="color: white;font-family: monospace;"> Haz click<a style="text-decoration: none; color: gray; font-family:monospace;" href=${process.env.FRONT_BASE_URL}/signin> Aqui </a> para hacer login en tu cuenta</h2>
    
    <p style="color: white; font-family: monospace; font-size: 1.2rem;"> Hemos confirmado tu email para tu cuenta de Servicio Tecnico.<p/>
    </div>`}    
    }
    
    module.exports=options;