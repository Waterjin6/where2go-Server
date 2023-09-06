import * as searchProvider from "./searchProvider.js";
import * as searchServicer from "./searchServicer.js";
import * as baseResponse from "../config/baseResponseStatus.js";

import {response, errResponse} from "../config/response.js";

export async function getSearch (req, res) {

    const {search, kind, fromD, toD, aCode, aDCode, free, align} = req.query;

    if (search) {
        const updateResults = await searchServicer .updateSearch(search);
    }

    const getSearchResults = await searchProvider.getSavedList(search, kind, fromD, toD, aCode, aDCode, free, align);

    if(!getSearchResults) return res.send(errResponse(baseResponse.SAVED_EVENTS_GET_ERROR));

    return res.send(response(baseResponse.SUCCESS, getSearchResults));
}


export async function getHotSearch (req, res) {

    const getHotSearchResults = await searchProvider.getHot();

    if(!getHotSearchResults) return res.send(errResponse(baseResponse.GET_HOT_SEARCH_ERROR));
    
    return res.send(response(baseResponse.SUCCESS, getHotSearchResults));
}