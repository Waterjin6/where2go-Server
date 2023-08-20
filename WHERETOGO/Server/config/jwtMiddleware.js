import pkg from 'jsonwebtoken';
const { verify } = pkg;

import secret_config from './secret.js';
import { response } from "./response.js";
import { errResponse } from "./response.js";
import { TOKEN_EMPTY, TOKEN_VERIFICATION_FAILURE } from "./baseResponseStatus.js";


const jwtMiddleware = (req, res, next) => {
    // read the token from header or url
    const token = req.headers['x-access-token'] || req.query.token;
    // token does not exist
    if(!token) {
        return res.send(errResponse(TOKEN_EMPTY))
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            verify(token, secret_config.jwtsecret , (err, verifiedToken) => {
                if(err) reject(err);
                resolve(verifiedToken)
            })
        }
    );

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        return res.send(errResponse(TOKEN_VERIFICATION_FAILURE))
    };
    // process the promise
    p.then((verifiedToken)=>{
        //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
        req.verifiedToken = verifiedToken;
        next();
    }).catch(onError)
};

export default jwtMiddleware;