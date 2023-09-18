import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";
import {upload} from "../config/multer.js";
import * as visitedController from "./visitedController.js";

// init express router
const visitedRouter = express.Router();
  

visitedRouter.get('/', jwtMiddleware, visitedController.getVisited);


visitedRouter.post('/:eventID', jwtMiddleware, visitedController.setVisited);
  
visitedRouter.delete('/:eventID', jwtMiddleware, visitedController.deleteVisited);

visitedRouter.get('/check/:eventID', jwtMiddleware, visitedController.checkVisited);

// review
visitedRouter.get('/review/:eventID',jwtMiddleware, visitedController.getReview);

visitedRouter.patch('/review/sv/:eventID', jwtMiddleware, upload.array("pic",10), visitedController.setReview);

visitedRouter.patch('/review/rm/:eventID',  jwtMiddleware, visitedController.deleteReview);



export default visitedRouter;