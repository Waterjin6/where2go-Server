import express from "express";

import * as searchController from "./searchController.js";

// init express router
const searchRouter = express.Router();
  

searchRouter.get('/', searchController.getSearch);

searchRouter.get('/hot', searchController.getHotSearch);


export default searchRouter;