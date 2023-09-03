import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as keywordController from "./keywordController.js";

// init express router
const keywordRouter = express.Router();
  

keywordRouter.get('/get', jwtMiddleware, keywordController.getKeyword);

keywordRouter.post('/put', jwtMiddleware,keywordController.setKeyword);
  
keywordRouter.delete('/delete', jwtMiddleware, keywordController.deleteKeyword);

export default keywordRouter;