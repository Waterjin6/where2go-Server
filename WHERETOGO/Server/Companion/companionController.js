import * as companionProvider from "./companionProvider.js";
import * as companionServicer from "./companionServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getList (req, res) {

    const getListResults = await companionProvider.getList();

    if(!getListResults) return res.send(errResponse(baseResponse.COMPANION_LIST_ERROR));

    return res.send(response(baseResponse.SUCCESS, getListResults));
}