const options=(uniqueString2)=>{
    return{subject:"Restore password",
    html:`<div style="display: flex;  flex-direction: column;  align-items: center;background-color: #ffc16f ; margin: 10rem;">
    <h1>Restore Password<h1/>
    <p>Hemos recibido una solicitud para cambiar contraseña<p/>
    <h2 style="color: white;font-family: monospace;"> Haz click<a style="text-decoration: none; color: gray; font-family:monospace;" href=${process.env.FRONT_BASE_URL}/RestorePassword/${uniqueString2}> Aqui </a> continuar con el proceso de recuperar contraseña</h2>
    <p>Este link solo es válido por 30 minutos<p/>
    <p style="color: white; font-family: monospace; font-size: 1.2rem;"> En caso de que haya sido un error, ignora este mensaje<p/>
    </div>`}    
    }
    
    module.exports=options;