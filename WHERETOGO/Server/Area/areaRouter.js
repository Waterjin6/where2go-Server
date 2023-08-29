//import jwtMiddleware from "../config/jwtMiddleware.js";

import express from "express";

import * as areaController from "./areaController.js";

// init express router
const areaRouter = express.Router();

areaRouter.get('/name/:areacode', areaController.getBigName);
areaRouter.get('/name/:bigarea/:smallarea', areaController.getSmallName);

areaRouter.get('/:areacode', areaController.getDetailList);
areaRouter.get('/', areaController.getList);

export default areaRouter;