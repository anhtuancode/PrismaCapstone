import { responseSuccess } from "../common/helpers/response.help";
import { detailService } from "../services/detail.service";

export const detailController = {
   detailImage: async function (req, res, next) {
      try {
         const result = await detailService.detailImage(req);
         const response = responseSuccess(result, `Get detail image successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   commentImage: async function (req, res, next) {
      try {
         const result = await detailService.commentImage(req);
         const response = responseSuccess(result, `Get comments image successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   save: async function (req, res, next) {
      try {
         const result = await detailService.checkSaveStatus(req);
         const response = responseSuccess(result, `Check save status successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};