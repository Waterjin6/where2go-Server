import * as visitedProvider from "./visitedProvider.js";
import * as visitedServicer from "./visitedServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {getEventExist} from "../Event/eventProvider.js"

import {response, errResponse} from "../config/response.js";

export async function getVisited (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getVisitedResults = await visitedProvider.getVisitedList(userIdFromJWT);

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

export async function setReview (req, res) {    
    const eventID = req.params.eventID;
    const userIdFromJWT = req.verifiedToken.userIdx;
    const {star, companionID, review, isPrivate} = req.body;
    var isSuccess = 0;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
    if(!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    if(!star) return res.send(errResponse(baseResponse.STAR_EMPTY));
    if(!companionID) return res.send(errResponse(baseResponse.COMPANION_ID_EMPTY));
    if(!review) return res.send(errResponse(baseResponse.REVIEW_EMPTY));
    if(!isPrivate) return res.send(errResponse(baseResponse.IS_PRIVATE_EMPTY));

    const isEventExist = await getEventExist(eventID);
    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkVisitedResults = await visitedProvider.checkVisitedList(userIdFromJWT, eventID);
    if(checkVisitedResults == 0) return res.send(errResponse(baseResponse.EVENT_NOT_VISITED));

    var picList = [null, null, null, null, null, null, null, null, null, null];

    for(let i = 0; req.files[i]; i++) picList[i] = `http://localhost:3000/images/visited/${req.files[i].filename}`;
    
    const insertReviewResults = await visitedServicer.insertReview(eventID, userIdFromJWT, star, companionID, picList, review, isPrivate);

    return res.send(response(baseResponse.SUCCESS));
}

export async function deleteReview (req, res) {    
    const eventID = req.params.eventID;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
    if(!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const isEventExist = await getEventExist(eventID);
    if(isEventExist == 0) return res.send(errResponse(baseResponse.EVENT_NOT_EXIST));

    const checkVisitedResults = await visitedProvider.checkVisitedList(userIdFromJWT, eventID);
    if(checkVisitedResults == 0) return res.send(errResponse(baseResponse.EVENT_NOT_VISITED));
    
    const deleteReviewResults = await visitedServicer.deleteReview(eventID, userIdFromJWT);

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

export async function getReview (req, res) {

    const visitedID = req.params.reviewID;
    if (!visitedID) return res.send(errResponse(baseResponse.REVIEW_ID_EMPTY));

    const getAReviewResults = await visitedProvider.getAReview(visitedID);
    if(!getAReviewResults) return res.send(errResponse(baseResponse.REVIEWS_GET_ERROR));

    return res.send(response(baseResponse.SUCCESS, getAReviewResults));
}


export async function getReviewList (req, res) {

    const eventID = req.params.eventID;

    if (!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const getReviewListResults = await visitedProvider.getReviewList(eventID);
    if(!getReviewListResults) return res.send(errResponse(baseResponse.REVIEWS_GET_ERROR));

    return res.send(response(baseResponse.SUCCESS, getReviewListResults));
}

