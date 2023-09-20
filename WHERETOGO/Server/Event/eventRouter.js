import express from "express";
import jwtMiddleware from "../config/jwtMiddleware.js";

import * as eventController from "./eventController.js";

// init express router
const eventRouter = express.Router();

eventRouter.get('/main', eventController.getMainBoard);
  
eventRouter.get('/top', eventController.getTopEvents);

eventRouter.get('/recommand/:sex/:age', eventController.getRecommandEvents);

eventRouter.get('/user-top', jwtMiddleware, eventController.getUserTopEvents);
  
eventRouter.get('/:eventID', eventController.getEventById);

eventRouter.get('/userInfo/:eventID', jwtMiddleware, eventController.getEventUserInfo);

eventRouter.get('/com-pop/:companionID', eventController.getComPopEvents);

export default eventRouter;