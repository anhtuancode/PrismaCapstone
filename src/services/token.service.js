import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";

const tokenService ={
    createToken: (userId) =>{
        const accessToken = jwt.sign({userId}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES});
        const refreshToken = jwt.sign({userId}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES});

        return {accessToken, refreshToken};
    }
}

export default tokenService;