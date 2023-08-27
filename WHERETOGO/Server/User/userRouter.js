import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

// import function from controller
// import {changeUserNInfo, changeUserPInfo, getUserPW, getUserNN, deleteUser, registerUser, loginUser, autoLogin} from "./userController.js";
import * as userController from "./userController.js";

// init express router
const userRouter = express.Router();
  
userRouter.patch('/changeN/:userID', jwtMiddleware, userController.patchUsersNickName);
  
userRouter.patch('/changeP/:userID', jwtMiddleware, userController.patchUsersPw);

userRouter.delete('/unregister/:userID', jwtMiddleware, userController.deleteUser);

userRouter.get('/check-pw/:userID', userController.getUserPW);

userRouter.get('/get-nickname/:userID', jwtMiddleware, userController.getUserNN);

userRouter.post('/sign-up', userController.registerUser);

userRouter.post('/login', userController.loginUser);

userRouter.post('/auto-login', jwtMiddleware, userController.autoLogin); 

export default userRouter;