import { responseSuccess } from "../common/helpers/response.help";
import { userService } from "../services/user.service";

export const userController = {
   getInfo: async function (req, res, next) {
      try {
         const result = await userService.getInfo(req);
         const response = responseSuccess(result, `Get user's information successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   update: async function (req, res, next) {
      try {
         const result = await userService.update(req);
         const response = responseSuccess(result, `Update user ${req.user.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   uploadImage: async function (req, res, next) {
      try {
         const result = await userService.uploadImage(req);
         const response = responseSuccess(result, `Upload image successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};