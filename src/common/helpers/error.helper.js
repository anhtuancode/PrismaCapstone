import { BadRequestException, ForBiddenException, UnAuthorizedException } from "./exception.helper";
import jwt from "jsonwebtoken";
import { responseError } from "./response.help";
export const handleError = (err, req, res, next) =>{
    console.log(err);

    let statusCode = err.statusCode || 500;

    if(err instanceof jwt.JsonWebTokenError){
        statusCode = (new UnAuthorizedException()).statusCode
    }
    if(err instanceof jwt.TokenExpiredError){
        statusCode = (new ForBiddenException()).statusCode
    }

    const response = responseError(err.message, statusCode, err.status);
    res.status(response.statusCode).json(response);   
}