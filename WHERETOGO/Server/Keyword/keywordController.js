import * as keywordProvider from "./keywordProvider.js";
import * as keywordServicer from "./keywordServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getKeyword (req, res) {

    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getKeywordResults = await keywordProvider.getKeywordList(userIdFromJWT);

    if(!getKeywordResults) return res.send(errResponse(baseResponse.KEYWORD_LIST_GET_ERROR));

    return res.send(response(baseResponse.SUCCESS, getKeywordResults));
}


export async function setKeyword (req, res) {    
    const keyword = req.body.keyword;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!keyword) return res.send(errResponse(baseResponse.KEYWORD_EMPTY));

    const isKeywordExist = await keywordProvider.checkKeywordExist(userIdFromJWT, keyword);

    if(isKeywordExist >= 1) return res.send(errResponse(baseResponse.KEYWORD_ALREADY_EXIST));

    const insertKeywordResults = await keywordServicer.insertKeyword(userIdFromJWT, keyword);

    return res.send(response(baseResponse.SUCCESS));
}


export async function deleteKeyword (req, res) {    
    const keyword = req.body.keyword;
    const userIdFromJWT = req.verifiedToken.userIdx;

    if (!userIdFromJWT) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!keyword) return res.send(errResponse(baseResponse.KEYWORD_EMPTY));

    const isKeywordExist = await keywordProvider.checkKeywordExist(userIdFromJWT, keyword);

    if(isKeywordExist == 0) return res.send(errResponse(baseResponse.KEYWORD_NO_EXIST));

    const deleteKeywordResults = await keywordServicer.deleteKeyword(userIdFromJWT, keyword);

    return res.send(response(baseResponse.SUCCESS));
}