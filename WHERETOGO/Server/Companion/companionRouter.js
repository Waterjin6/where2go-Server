import express from "express";

import * as companionController from "./companionController.js";

// init express router
const companionRouter = express.Router();
  
companionRouter.get('/', companionController.getList);

export default companionRouter;