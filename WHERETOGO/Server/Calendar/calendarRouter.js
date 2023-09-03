import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as calendarController from "./calendarController.js";

// init express router
const calendarRouter = express.Router();
  
calendarRouter.get('/get', jwtMiddleware, calendarController.getSaved);

export default calendarRouter;