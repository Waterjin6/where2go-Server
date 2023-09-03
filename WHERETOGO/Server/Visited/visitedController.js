import * as visitedProvider from "./visitedProvider.js";
import * as visitedServicer from "./visitedServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {getEventExist} from "../Event/eventProvider.js"

import {response, errResponse} from "../config/response.js";

export async function getVisited (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getVisitedResults = await savedProvider.getSavedList(userIdFromJWT);

    if(!getVisitedResults) return res.send(errResponse(baseResponse.VISITED_EVENTS_GET_ERROR));

    return res.send(response(baseResponse.SUCCESS, getVisitedResults));
}


export async function checkVisited (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;
    const eventID = req.params.eventID;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const isEventExist = await getEventExist(eventID);

    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkVisitedResults = await visitedProvider.checkVisitedList(userIdFromJWT, eventID);

    if(checkVisitedResults == undefined) return res.send(errResponse(baseResponse.CHECK_VISITED_EVENT_ERROR));

    if(checkVisitedResults == 1) return res.send(response(baseResponse.SUCCESS, {"isVisited" : true}));
    
    return res.send(response(baseResponse.SUCCESS, {"isVisited" : false}));
}

export async function setVisited (req, res) {    
    const eventID = req.params.eventID;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const isEventExist = await getEventExist(eventID);

    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkVisitedResults = await visitedProvider.checkVisitedList(userIdFromJWT, eventID);

    if(checkVisitedResults == 1) return res.send(errResponse(baseResponse.EVENT_ALREADY_VISITED));


    const insertVisitedResults = await visitedServicer.insertVisited(eventID, userIdFromJWT);

    return res.send(response(baseResponse.SUCCESS));
}

export async function deleteVisited (req, res) {    
    const eventID = req.params.eventID;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const isEventExist = await getEventExist(eventID);

    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkVisitedResults = await visitedProvider.checkVisitedList(userIdFromJWT, eventID);

    if(checkVisitedResults == 0) return res.send(errResponse(baseResponse.EVENT_NOT_VISITED));

    const deleteVisitedResults = await visitedServicer.deleteVisited(eventID, userIdFromJWT);

    return res.send(response(baseResponse.SUCCESS));
}
