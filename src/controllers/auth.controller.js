import { responseSuccess } from "../common/helpers/response.help";
import { authService } from "../services/auth.service";

export const authController = {
   register: async function (req, res, next) {
      try {
         const result = await authService.register(req);
         const response = responseSuccess(result, `Create account successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   login: async function (req, res, next) {
      try {
         const result = await authService.login(req);
         const response = responseSuccess(result, `Login successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   forgotPassword: async function (req, res, next) {
      try {
         const result = await authService.forgotPassword(req);
         const response = responseSuccess(result, `Get password successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   refreshToken: async function (req, res, next) {
      try {
         const result = await authService.refreshToken(req);
         const response = responseSuccess(result, `Refresh token successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};