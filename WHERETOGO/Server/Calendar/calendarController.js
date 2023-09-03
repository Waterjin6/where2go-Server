import * as calendarProvider from "./calendarProvider.js";
import * as calendarServicer from "./calendarServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getSaved (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getSavedResults = await calendarProvider.getSavedList(userIdFromJWT);

    if(!getSavedResults) return res.send(errResponse(baseResponse.SAVED_EVENTS_GET_ERROR));

    return res.send(response(baseResponse.SUCCESS, getSavedResults));
}
