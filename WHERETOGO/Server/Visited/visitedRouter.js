import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";
import upload from "../config/multer.js";
import * as visitedController from "./visitedController.js";

// init express router
const visitedRouter = express.Router();
  

visitedRouter.get('/get', jwtMiddleware, visitedController.getVisited);

visitedRouter.post('/put/:eventID', jwtMiddleware, upload.array("pic"), visitedController.setVisited);
  
visitedRouter.delete('/delete/:eventID', jwtMiddleware, visitedController.deleteVisited);

visitedRouter.get('/check/:eventID', jwtMiddleware, visitedController.checkVisited);

export default visitedRouter;