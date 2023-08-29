import express from "express";

import * as kindController from "./kindController.js";

// init express router
const kindRouter = express.Router();

kindRouter.get('/:kind', kindController.getKind);
kindRouter.get('/', kindController.getKindLists);

export default kindRouter;