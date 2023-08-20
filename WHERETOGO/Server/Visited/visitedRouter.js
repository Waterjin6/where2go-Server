// import express
import express from "express";
import jwtMiddleware from "../config/jwtMiddleware.js";

// import function from controller
 import {getVisited, setVisited, deleteVisited, checkVisited, getReview} from "./visitedController.js";

// init express router
const visitedRouter = express.Router();
  

visitedRouter.get('/:userID', jwtMiddleware, getVisited);
  
visitedRouter.post('/:userID/:eventID/:assess', jwtMiddleware, setVisited);
  
visitedRouter.delete('/:userID/:eventID', jwtMiddleware, deleteVisited);

visitedRouter.get('/check/:userID/:eventID', jwtMiddleware, checkVisited);

visitedRouter.get('/review/:reviewID', jwtMiddleware, getReview);

export default visitedRouter;