import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as savedController from "./savedController.js";

// init express router
const savedRouter = express.Router();
  

savedRouter.get('/', jwtMiddleware, savedController.getSaved);

savedRouter.post('/:eventID', jwtMiddleware,savedController.setSaved);
  
savedRouter.delete('/:eventID', jwtMiddleware, savedController.deleteSaved);

savedRouter.get('/check/:eventID', jwtMiddleware, savedController.checkSaved);

export default savedRouter;