import jwtMiddleware from "../config/jwtMiddleware.js";
const visitedProvider = "./visitedProvider.js";
const visitedServicer = "./visitedServicer.js";
const baseResponse = "../config/baseResponseStatus.js";
import {response, errResponse} from "../config/response.js";

export const getVisited = async function(req, res) {
    const userIdFromJWT = req.verifiedToken.userIdx;
    const userIdx = req.params.userID;
    
    if(!userIdx)return res.send(errResponse(baseResponse.USER_IDX_EMPTY));

    const VisitedList = await visitedProvider.getVisitedEvent(uid);
    if (!VisitedList) return res.send(response(baseResponse.USER_VISITED_EVENT_EMPTY));
    return res.send(response(baseResponse.SUCCESS, VisitedList));

}
/*
export const getVisited = (req, res) => {
    const uid = req.params.userID;
    getVisitedEvent(uid, (stat, err, results) => {
        if (err){
            res.status(stat).send(err);
        }else{
            res.status(stat).json(results);
        }
    });
}
*/
export const getReview = (req, res) => {
    const rid = req.params.reviewID;
    getReviewDetail(rid,(stat, err, results) => {
        if (err){
            res.status(stat).send(err);
        }else{
            res.status(stat).json(results);
        }
    });
}

export const setVisited = (req, res) => {
    const uid = req.params.userID;
    const eid = req.params.eventID;
    const ass = req.params.assess;
    addVisitedEvent(uid, eid, ass,(stat, err, results) => {
        if (err){
            res.status(stat).send(err);
        }else{
            res.status(stat).json(results);
        }
    });
}
  

export const deleteVisited = (req, res) => {
    const uid = req.params.userID;
    const eid = req.params.eventID;
    deleteVisitedEvent(uid, eid, (stat, err, results) => {
        if (err){
            res.status(stat).send(err);
        }else{
            res.status(stat).json(results);
        }
    });
}

export const checkVisited = (req, res) => {
    const uid = req.params.userID;
    const eid = req.params.eventID;
    getIfVisited(uid, eid, (stat, err, results) => {
        if (err){
            res.status(stat).send(err);
        }else{
            res.status(stat).json(results);
        }
    });
}