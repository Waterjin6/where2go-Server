import * as kindProvider from "./kindProvider.js";
import * as kindServicer from "./kindServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getKind (req, res) {
    const kind = req.params.kind;

    if(!kind) return res.send(errResponse(baseResponse.KINDCODE_EMPTY));
    
    const getKindNameResults = await kindProvider.getKindName(kind);

    if(!getKindNameResults) return res.send(errResponse(baseResponse.KIND_NOT_EXIST));

    return res.send(response(baseResponse.SUCCESS, getKindNameResults));
}

export async function getKindLists (req, res) {    
    const getKindListResults = await kindProvider.getKindList();

    if(!getKindListResults) return res.send(errResponse(baseResponse.KIND_LIST_ERROR));

    return res.send(response(baseResponse.SUCCESS, getKindListResults));
}