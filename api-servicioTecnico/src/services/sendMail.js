const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const verifyEmail = require("./mails/VerifyEmail")

const emailTypes={
  VerifyEmail:(uniqueString)=>verifyEmail(uniqueString),
  EmailVerified:"",
  RestorePassword:"",
  PasswordRestored:"",
  UpdateUserEmail:"",
  UpdateRole:""
}


const sendMail = (email, uniqueString) => {
  // console.log(emailTypes.VerifyEmail("asd"))
  const myOAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENTID,
    process.env.GOOGLE_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESHTOKEN,
  });

  const accessToken = myOAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      type: "OAuth2",
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_SECRET,
      refreshToken: process.env.GOOGLE_REFRESHTOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    // mejorar
    from: process.env.GOOGLE_USER,
    to: email,
    subject: "Validacion de mail",
    html: `
    <div style="display: flex;  flex-direction: column;  align-items: center;background-color: #ffc16f ; margin: 10rem;">
    <img src="https://i.ibb.co/bbhkHtH/logo-Sin-Fondo.png" width="100px" alt="">
<h1 style="color: white;font-family: monospace;"> Haz click<a style="text-decoration: none; color: gray; font-family:monospace;" href=http://localhost:4000/api/auth/verifyEmail/${uniqueString}> Aquí </a> para validar tu cuenta</h1>

<p style="color: white; font-family: monospace; font-size: 1.2rem;"> Hemos recibido una solicitud de confirmación de email para tu cuenta de Gluttony.<p/>
</div>
        `,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("mensaje enviado");
    }
  });
};

module.exports = sendMail;
