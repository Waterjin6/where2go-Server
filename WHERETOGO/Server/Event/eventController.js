import * as eventProvider from "./eventProvider.js";
import {getUserSexAge} from "../User/userProvider.js"
import * as eventServicer from "./eventServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";
import {checkSavedList} from "../Saved/savedProvider.js";
import {checkVisitedList} from "../Visited/visitedProvider.js";


import {response, errResponse} from "../config/response.js";

export async function getMainBoard (req, res) {

    const getMainBoardResults = await eventProvider.getMainBoardList();

    if(!getMainBoardResults) return res.send(errResponse(baseResponse.MAIN_BOARD_CONTENTS_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getMainBoardResults));
}

export async function getTopEvents (req, res) {    
    const getTopEventResults = await eventProvider.getTopList();

    if(!getTopEventResults) return res.send(errResponse(baseResponse.TOP_EVENT_LOADING_ERROR));

    return res.send(response(baseResponse.SUCCESS, getTopEventResults));
}

export async function getRecommandEvents (req, res) { 
    const sex = req.params.sex;
    const age = req.params.age;

    const {fromD, toD, aCode, aDCode} = req.query;

    const getRecommandEventResults = await eventProvider.getRecommandEventsList(sex, age, fromD, toD, aCode, aDCode);

    if(!getRecommandEventResults) return res.send(errResponse(baseResponse.RECOMMAND_EVENT_LOADING_ERROR));

    return res.send(response(baseResponse.SUCCESS, {'sex': sex, 'age': age, getRecommandEventResults}));
}

export async function getUserTopEvents (req, res) { 
    var sex = 'w';
    var age = 2;

    const userIdFromJWT = req.verifiedToken.userIdx;
    const {fromD, toD, aCode, aDCode} = req.query;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getUserInfoResults = await getUserSexAge(userIdFromJWT);

    if((getUserInfoResults.sex == 'w')||(getUserInfoResults.sex == 'm'))sex = getUserInfoResults.sex;
    if((getUserInfoResults.age != undefined)&&(getUserInfoResults.age >= 1)&&(getUserInfoResults.age <= 6))age = getUserInfoResults.age;

    const getRecommandEventResults = await eventProvider.getRecommandEventsList(sex, age, fromD, toD, aCode, aDCode);

    if(!getRecommandEventResults) return res.send(errResponse(baseResponse.USER_TOP_EVENT_LOADING_ERROR));

    return res.send(response(baseResponse.SUCCESS, {'sex': sex, 'age': age, 'recommend events' : getRecommandEventResults}));
}

export async function getEventById (req, res) { 
    const eventID = req.params.eventID;

    if (!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    const getEventInfoResults = await eventProvider.getEventInfo(eventID);

    if(!getEventInfoResults) return res.send(errResponse(baseResponse.EVENT_INFO_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getEventInfoResults));
}

export async function getEventUserInfo (req, res) { 
    const eventID = req.params.eventID;

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if (!eventID) return res.send(errResponse(baseResponse.EVENT_ID_EMPTY));

    var isVisited = false, isSaved = false;

    const checkSavedResults = await checkSavedList(userIdFromJWT, eventID);
    const checkVisitedResults = await checkVisitedList(userIdFromJWT, eventID);

    if(checkSavedResults == 1)isSaved = true;
    if(checkVisitedResults == 1)isVisited = true;

    return res.send(response(baseResponse.SUCCESS, {"isVisited" : isVisited, "isSaved" : isSaved}));
}

export async function getComPopEvents (req, res) { 
    const cID = req.params.companionID;
    if (!cID) return res.send(errResponse(baseResponse.COMPANION_ID_EMPTY));

    const {fromD, toD, aCode, aDCode} = req.query;

    const getComPopResults = await eventProvider.getComPopList(cID, fromD, toD, aCode, aDCode);

    if(!getComPopResults) return res.send(errResponse(baseResponse.COMPANION_POP_LIST_ERROR));

    return res.send(response(baseResponse.SUCCESS, getComPopResults));
}