const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const verifyEmail = require("./mails/VerifyEmail")
const emailVerified = require("./mails/EmailVerified")
const restorePassword = require("./mails/RestorePassword")
const passwordRestored = require("./mails/PasswordRestored")

const sendMail = (email, options) => {
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
    subject: options.subject,
    html: options.html,
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("mensaje enviado");
    }
  });
};

const getEmailOptions={
  VerifyEmail:(uniqueString)=>verifyEmail(uniqueString),
  EmailVerified:(name)=>emailVerified(name),
  RestorePassword:(uniqueString2)=>restorePassword(uniqueString2),
  PasswordRestored:(name)=>passwordRestored(name),
  UpdateUserEmail:"",
  UpdateRole:""
}

const sendMailMethod={
  verifyEmail:(email,uniqueString) => {
    sendMail(email,getEmailOptions.VerifyEmail(uniqueString))
  },
  emailVerified:(email,name) => {
    sendMail(email,getEmailOptions.EmailVerified(name))
  },
  restorePassword:(email,uniqueString2) => {
    sendMail(email,getEmailOptions.RestorePassword(uniqueString2))
  },
  passwordRestored:(email,name) => {
    sendMail(email,getEmailOptions.PasswordRestored(name))
  },
  updateUserEmail:(email,uniqueString) => {
    sendMail(email,getEmailOptions.UpdateUserEmail(uniqueString))
  },
  updateRole:(email,uniqueString) => {
    sendMail(email,getEmailOptions.UpdateRole(uniqueString))
  },
}

module.exports = sendMailMethod;
