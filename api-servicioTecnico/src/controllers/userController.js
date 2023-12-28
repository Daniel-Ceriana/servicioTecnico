const User = require("../models/userModel.js");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const sendMailMethod = require("../services/sendMail.js");

const userController = {
  verifyEmail: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { uniqueString: req.params.string },
        { emailVerification: true }
      );
      console.log(user)
      sendMailMethod.emailVerified(user.email,user.fullName)
      return res.redirect(`${process.env.FRONT_BASE_URL}/login`);
    } catch (error) {
      console.log(error)
      return res.json({
        success: false,
        from: "user verification",
        message: "Error: user not found",
  
      });
    }
  },

  signIn: async (req, res) => {
    if (!req.body.userData) {
      return res.json({
        success: false,
        from: "controller",
        message: "Error: no data found",
      });
    }
    const { email, password, from } = req.body.userData;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          from: from,
          message: "User or password incorrect.",
        });
      }

      const aux = user.password.filter((signUp)=>signUp.from===from )
      console.log(password, aux[0].password)
      const isPasswordCorrect  = await bcryptjs.compare(password, aux[0].password)
      
      const dataUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        from: from,
      };

      if (isPasswordCorrect) {
          const token = jwt.sign(dataUser, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          res.json({
            success: true,
            from,
            response: { token, dataUser },
            message: "Welcome back, " + dataUser.fullName,
          });
        
      } else {
        res.json({
          success: false,
          from,
          message: "User or password incorrect",
        });
      }
    } catch (err) {
      res.json({
        success: false,
        from: from,
        message: "Ups, something went wrong, please try again in a few minutes",
        response: err,
      });
    }
  },
  signUp: async (req, res) => {
    const uniqueString = crypto.randomBytes(15).toString("hex");

    // before checking data values, checks if userData exists
    if (!req.body.userData) {
      return res.json({
        success: false,
        from: "Sign Up controller",
        message: "Error: no data found",
      });
    }

    const { fullName, email, password, from, aplication } =
      req.body.userData;
      try {
      const hashPassword =await bcryptjs.hash(password, 10);

      const userExist = await User.findOne({ email });


      if (userExist) {
          if (userExist.password.filter((signUp)=>signUp.from===from)!==-1) {
          res.json({
            success: false,
            from: from,
            message: "You already have an account, please, sign in instead.",
          });
        } 
        //------------------------------------------------------------------------ Multiple login options
        // else {
        //   userExist.from.push(from);
        //   userExist.password.push(hashPassword);

        //   await userExist.save();

        //   res.json({
        //     success: true,
        //     from: from,
        //     message: from + " was added to your sign in methods.",
        //   });
        // }

      } else {

        const newUser = new User({
          fullName,
          email,
          password:{},
          aplication: aplication,
          uniqueString: uniqueString,
          emailVerification: false,
          role: "user",
        });
        if (from === "signUp-form") {
          
          // console.log("Email Sent");
          sendMailMethod.verifyEmail(email,uniqueString)
          newUser.password={from:"signUp-form","password":hashPassword};
          await newUser.save();
          res.json({
            success: true,
            from: "controller",
            message:
              "User created and added, check your email to verify account ",
          });
          // 9:54
        } else{
          console.log(error);
      res.json({
        success: false,
        from: "controller",
        message: "something's gone wrong with sign Up method, try again in a few minutes",
      });
        }
        //---------------------------------------------------------- might support later
        // else {
        //   // if it's coming from social network
        //   // create new user with no need of verification
        //   // const socialNetworks = ["google","facebook"]...;
        //   // for(){if(socialNetworks[i]){
        //   // crear usuario ya verificado
        //   //   [google]
        //   // }}
        //   newUser.emailVerification = true;
        //   await newUser.save();

        //   res.json({
        //     success: true,
        //     from: from,
        //     message:
        //       "User created and added " + from + " to your sign in methods",
        //   });
        // }
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        from: "controller",
        message: "something's gone wrong, try again in a few minutes",
      });
    }
  },
  verifyToken: async (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        from: null,
        // validar que los datos existan
        response: {
          id: req.user._id,
          email: req.user.email,
          fullName: req.user.fullName,
          role: req.user.role,
          from: req.user.from,

        },
        message: "Welcome back, " + req.user.fullName,
      });
    } else {
      res.json({
        success: false,
        message: "Please sign in again",
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      // sacar el id desde el token
      // actualizar token
      console.log("llega 1");

      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );
      return res.json({
        success: true,
        response: {
          dataUser: {
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            from: user.from,
            password: user.password,
          },
        },
        message: "User updated",
      });
    } catch (err) {
      return res.json({
        success: false,
        message: "Something went wrong while updating user, try again later",
      });
    }
  },
  restorePassword: async (req,res)=>{
    let valid=false;
    try {
      console.log(req.query)
      if(req.query.email){
        // crear uniqueString 2 en user. Puede ser token para que tenga un tiempo de validez
       const uniqueString2 = crypto.randomBytes(15).toString("hex");

        const token = jwt.sign({email:req.query.email,uniqueString2}, process.env.SECRET_TOKEN, {
          expiresIn: 600,
        });
        const user = await User.findOneAndUpdate( 
          { email:req.query.email },
          { uniqueString2,
            changePasswordToken:token
          },
          { new: true })
            
        sendMailMethod.restorePassword(req.query.email,uniqueString2)
        valid=true;
        return res.json({
          success:true,
          message:"Check your inbox to restore password.",
          response:{email:req.query,user}
        })
      }
      
      


      if(req.body){
        // recibe password y el unique string 2 para buscar al usuario. chequea el token creado anteriormente(guardado en el usuario) para validar
        // si todo es valido, manda mail confirmando
        console.log(req.body)
        if(req.body.password && req.body.uniqueString2){     
          // hashea la contraseña nueva 
          const newPassword = await bcryptjs.hash(req.body.password, 10); 
          //#region optimizable?
          // el array de contraseñas es para que se puedan en un futuro loguear por redes sociales sin cambiar toda la estructura del modelo
          // busca al usuario
          const user=await User.findOne({ uniqueString2:req.body.uniqueString2 });
          // chequea que el token dentro del usuario sea valido
          try {
            let jtwDecoded;
            await jwt.verify(user.changePasswordToken, process.env.SECRET_TOKEN,(error,decoded)=>{
              if(req.query.string2===decoded.uniqueString2){
                jtwDecoded=decoded;
              }   
              if(error){
                  console.log(error)
                  return res.json({
                    success: false,
                    from:"controller",
                    message: "Not authorized",
                  })
                }
              })  
          } catch (error) {
            console.log(error)
            return res.json({
              success: false,
              from:"controller",
              message: "Something went wrong, please start the process agains",
            })
          }
          // busca la contraseña correcta dentro del array de contraseñas
          // ya que tiene un objeto user, le modifica la contraseña correcta y deja las otras posibles intactas
          user.password.map((signUp)=>{if(signUp.from==="signUp-form"){signUp.password=newPassword}})
          // busca otra vez al usuario y le actualiza todo el array de contraseñas.
          await User.findOneAndUpdate({uniqueString2:req.body.uniqueString2},{password:user.password,changePasswordToken:"",uniqueString2:""},{ new: true})
         //#endregion
          sendMailMethod.passwordRestored(user.email,user.fullName)
          valid=true
          // agregar response {datos de usuario para redux}
        return res.json({
          success:true,
          message:"Password restored.",
          response:{}
          // response:{dataUser} 
        })
        }
        
      }



      // if nothing is valid then
      if(!valid){
        return res.json({
          success: false,
          from:"controller",
          message: "Something went wrong, try again later",
        });
      }
      
      
      
    } catch (error) {
      console.log(error)

      return res.json({
        success: false,
        from:"controller",
        message: "Something went wrong while restoring password, try again later",
      });
    }
  },
  changeRole: async (req,res)=>{

  },
  testFindUsers:async(req,res)=>{
    try {
      const users = await User.find();
      return res.json({
        users
      })
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = userController;