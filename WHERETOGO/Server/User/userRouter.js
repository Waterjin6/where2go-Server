// import express
import express from "express";
import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

// import function from controller
import {changeUserNInfo, changeUserPInfo, getUserPW, getUserNN, deleteUser, registerUser, loginUser, autoLogin} from "./userController.js";

// init express router
const userRouter = express.Router();
  
  
userRouter.patch('/changeN/:userID', jwtMiddleware, changeUserNInfo);
  
userRouter.patch('/changeP/:userID', jwtMiddleware, changeUserPInfo);

userRouter.delete('/unregister/:userID', jwtMiddleware, deleteUser);

userRouter.post('/check-pw/:userID', jwtMiddleware, getUserPW);

userRouter.get('/get-nickname/:userID', jwtMiddleware, getUserNN);

userRouter.post('/sign-up', registerUser);

userRouter.post('/login', loginUser);

userRouter.post('/auto-login', jwtMiddleware, autoLogin);

export default userRouter;