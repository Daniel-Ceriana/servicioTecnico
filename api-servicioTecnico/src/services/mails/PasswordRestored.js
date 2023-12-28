const options=(name)=>{
    return{subject:"Restore password",
    html:`<div style="display: flex;  flex-direction: column;  align-items: center;background-color: #ffc16f ; margin: 10rem;">
    <h1>Password restored<h1/>
    <p>Hemos cambiado tu contraseña, ${name}<p/>
    <h2 style="color: white;font-family: monospace;"> Haz click<a style="text-decoration: none; color: gray; font-family:monospace;" href=${process.env.FRONT_BASE_URL}/SignIn> Aqui </a> continuar</h2>
    <p style="color: white; font-family: monospace; font-size: 1.2rem;"> En caso de que haya sido un error, ponte en contacto con soporte tecnico<p/>
    </div>`}    
    }
    
    module.exports=options;