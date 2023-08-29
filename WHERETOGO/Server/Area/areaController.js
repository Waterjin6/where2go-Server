
import * as areaProvider from "./areaProvider.js";
import * as areaServicer from "./areaServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getBigName (req, res) {
    const areacode = req.params.areacode;

    if(!areacode) return res.send(errResponse(baseResponse.BIG_AREACODE_EMPTY));
    
    const getBigNameResults = await areaProvider.getBigContent(areacode);

    if(!getBigNameResults) return res.send(errResponse(baseResponse.BIG_AREACODE_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getBigNameResults));
}

export async function getSmallName (req, res) {
    const bigarea = req.params.bigarea;
    const smallarea = req.params.smallarea;

    if(!bigarea) return res.send(errResponse(baseResponse.BIG_AREACODE_EMPTY));
    if(!smallarea) return res.send(errResponse(baseResponse.SMALL_AREACODE_EMPTY));
    
    const getSmallNameResults = await areaProvider.getSmallContent(bigarea, smallarea);

    if(!getSmallNameResults) return res.send(errResponse(baseResponse.SMALL_AREACODE_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getSmallNameResults));
}


export async function getList (req, res) {
    const getListResults = await areaProvider.getListContent();

    if(!getListResults) return res.send(errResponse(baseResponse.AREACODE_LIST_ERROR));

    return res.send(response(baseResponse.SUCCESS, getListResults));
}

export async function getDetailList (req, res) {
    const areacode = req.params.areacode;

    if(!areacode) return res.send(errResponse(baseResponse.BIG_AREACODE_EMPTY));
    
    const getDetailListResults = await areaProvider.getDListContent(areacode);

    if(!getDetailListResults) return res.send(errResponse(baseResponse.AREACODE_LIST_ERROR));

    return res.send(response(baseResponse.SUCCESS, getDetailListResults));
}