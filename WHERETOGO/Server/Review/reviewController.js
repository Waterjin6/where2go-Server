import * as reviewProvider from "./reviewProvider.js";
import * as reviewServicer from "./reviewServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function putReviewLike (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;
    const reviewID = req.params.reviewID;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
    if (!reviewID) return res.send(errResponse(baseResponse.REVIEW_ID_EMPTY));

    const checkReviewLikeResults = await reviewProvider.checkReviewLike(userIdFromJWT, reviewID);

    if(checkReviewLikeResults == 1) return res.send(errResponse(baseResponse.REVIEW_ALREADY_LIKED));

    const putReviewLikeResults = await reviewServicer.putReviewLike(userIdFromJWT, reviewID);

    return res.send(response(baseResponse.SUCCESS));
}


export async function checkReviewLike (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;
    const reviewID = req.params.reviewID;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
    if (!reviewID) return res.send(errResponse(baseResponse.REVIEW_ID_EMPTY));

    const checkReviewLikeResults = await reviewProvider.checkReviewLike(userIdFromJWT, reviewID);

    if(checkReviewLikeResults == undefined) return res.send(errResponse(baseResponse.CHECK_REVIEW_LIKED_ERROR));

    if(checkReviewLikeResults == 1) return res.send(response(baseResponse.SUCCESS, {"isLiked" : true}));
    
    return res.send(response(baseResponse.SUCCESS, {"isLiked" : false}));
}