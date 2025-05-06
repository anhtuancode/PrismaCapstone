import { responseSuccess } from "../common/helpers/response.help";
import { mainService } from "../services/main.service";

export const mainController = {
   findAll: async function (req, res, next) {
      try {
         const result = await mainService.findAll(req);
         const response = responseSuccess(result, `Get all images successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   search: async function (req, res, next) {
      try {
         const result = await mainService.search(req);
         const response = responseSuccess(result, `Search image successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};