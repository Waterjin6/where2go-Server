import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as visitedController from "./visitedController.js";

// init express router
const visitedRouter = express.Router();
  

visitedRouter.get('/get', jwtMiddleware, visitedController.getVisited);

visitedRouter.post('/put/:eventID', jwtMiddleware,visitedController.setVisited);
  
visitedRouter.delete('/delete/:eventID', jwtMiddleware, visitedController.deleteVisited);

visitedRouter.get('/check/:eventID', jwtMiddleware, visitedController.checkVisited);

export default visitedRouter;