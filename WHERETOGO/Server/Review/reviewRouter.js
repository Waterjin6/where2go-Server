import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as reviewController from "./reviewController.js";

// init express router
const reviewRouter = express.Router();
  

reviewRouter.post('/like/:reviewID', jwtMiddleware, reviewController.putReviewLike);

reviewRouter.get('/like/:reviewID', jwtMiddleware, reviewController.checkReviewLike);

export default reviewRouter;