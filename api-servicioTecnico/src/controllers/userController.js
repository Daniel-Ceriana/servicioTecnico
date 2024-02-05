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
      return res.redirect(`${process.env.FRONT_BASE_URL}/signIn`);
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
    const { email, password } = req.body.userData;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          from: "User signIn",
          message: "User or password incorrect.",
        });
      }

      const isPasswordCorrect  = await bcryptjs.compare(password, user.password)
      const dataUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      };

      if (isPasswordCorrect) {
          const token = jwt.sign(dataUser, process.env.SECRET_TOKEN, {
            expiresIn: "1h",
          });
          res.json({
            success: true,
            from:"User signIn",
            response: { token, dataUser },
            message: "Welcome back, " + dataUser.fullName,
          });
        
      } else {
        res.json({
          success: false,
          from:"User signIn",
          message: "User or password incorrect",
        });
      }
    } catch (err) {
      res.json({
        success: false,
        from: "User signin",
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

    const { fullName, email, password } =
      req.body.userData;
      try {
        
        const userExist = await User.findOne({ email });
        
        
        if (userExist) {
            res.json({
              success: false,
              from: "User signup",
              message: "You already have an account, please, sign in instead.",
            });
        } else {
          const hashPassword =await bcryptjs.hash(password, 10);
          const newUser = new User({
            fullName,
            email,
            password:hashPassword,
            uniqueString: uniqueString,
            emailVerification: false,
            role: "user",
          });

          sendMailMethod.verifyEmail(email,uniqueString)
          await newUser.save();
          res.json({
            success: true,
            from: "controller",
            message:
              "User created and added, check your email to verify account ",
          });
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
      if(!req.params.id){
        return res.json({
          success: false,
          message: "User not found, log in again and retry",
        });
      }
      let changes={};
      //#region 
      // necesita más lógica
      if(req.body.email){
        const uniqueString = crypto.randomBytes(15).toString("hex");
        changes.uniqueString=uniqueString;
        sendMailMethod.verifyEmail(req.body.email,uniqueString)
      }
      //#endregion
      if(req.body.fullName){
        changes.fullName=req.body.fullName;
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
         changes,
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
        await User.findOneAndUpdate( 
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
          response:{email:req.query}
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
            await jwt.verify(user.changePasswordToken, process.env.SECRET_TOKEN,(error,decoded)=>{

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
              message: "Something went wrong, please start the process again",
            })
          }
          user.password =newPassword
          // busca otra vez al usuario y le actualiza la contraseña. vuelve a poner por defecto los tokens usados.
          await User.findOneAndUpdate({uniqueString2:req.body.uniqueString2},{password:user.password,changePasswordToken:"",uniqueString2:""},{ new: true })
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