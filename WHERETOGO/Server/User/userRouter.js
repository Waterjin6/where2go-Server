import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as userController from "./userController.js";

// init express router
const userRouter = express.Router();
  
userRouter.patch('/changeN', jwtMiddleware, userController.patchUsersNickName);
  
userRouter.patch('/changeP', jwtMiddleware, userController.patchUsersPw);

userRouter.delete('/unregister', jwtMiddleware, userController.deleteUser);

userRouter.post('/check-pw', jwtMiddleware, userController.getUserPW);

userRouter.get('/get-nickname', jwtMiddleware, userController.getUserNN);

userRouter.post('/sign-up', userController.registerUser);

userRouter.post('/login', userController.loginUser);

export default userRouter;