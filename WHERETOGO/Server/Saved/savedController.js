import * as savedProvider from "./savedProvider.js";
import * as savedServicer from "./savedServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {getEventExist} from "../Event/eventProvider.js"

import {response, errResponse} from "../config/response.js";

export async function getSaved (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getSavedResults = await savedProvider.getSavedList(userIdFromJWT);

    if(!getSavedResults) return res.send(errResponse(baseResponse.SAVED_EVENT_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getSavedResults));
}


export async function checkSaved (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;
    const eventID = req.params.eventID;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const isEventExist = await getEventExist(eventID);

    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkSavedResults = await savedProvider.checkSavedList(userIdFromJWT, eventID);

    if(checkSavedResults == undefined) return res.send(errResponse(baseResponse.CHECK_SAVED_EVENT_ERROR));

    if(checkSavedResults == 1) return res.send(response(baseResponse.SUCCESS, {"isSaved" : true}));
    
    return res.send(response(baseResponse.SUCCESS, {"isSaved" : false}));
}

export async function setSaved (req, res) {    
    const eventID = req.params.eventID;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const isEventExist = await getEventExist(eventID);

    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkSavedResults = await savedProvider.checkSavedList(userIdFromJWT, eventID);

    if(checkSavedResults == 1) return res.send(errResponse(baseResponse.EVENT_ALREADY_SAVED));


    const insertSavedResults = await savedServicer.insertSaved(eventID, userIdFromJWT);

    return res.send(response(baseResponse.SUCCESS));
}


export async function deleteSaved (req, res) {    
    const eventID = req.params.eventID;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const isEventExist = await getEventExist(eventID);

    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkSavedResults = await savedProvider.checkSavedList(userIdFromJWT, eventID);

    if(checkSavedResults == 0) return res.send(errResponse(baseResponse.EVENT_NOT_SAVED));

    const deleteSavedResults = await savedServicer.deleteSaved(eventID, userIdFromJWT);

    return res.send(response(baseResponse.SUCCESS));
}

