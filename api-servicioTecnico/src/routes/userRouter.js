const express = require("express");
const userRouter = express.Router();
const { signUpValidator, signInValidator } = require("../config/validator");
const passport = require("../config/passport");

const userController = require("../controllers/userController");

userRouter.post("/auth/signUp", signUpValidator, userController.signUp);
userRouter.post("/auth/signIn", signInValidator, userController.signIn);
userRouter.get("/auth/verifyEmail/:string", userController.verifyEmail);
userRouter.get(
  "/auth/verifyToken",
  passport.authenticate("jwt", { session: false }),
  userController.verifyToken
);
userRouter.put("/auth/:id", userController.updateUser);
// -----------------------token

//test
userRouter.get("/auth/testFindUsers",userController.testFindUsers)

module.exports = userRouter;
