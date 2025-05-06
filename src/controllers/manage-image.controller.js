import { responseSuccess } from "../common/helpers/response.help";
import { manageImageService } from "../services/manage-image.service";

export const manageImageController = {
   getInfo: async function (req, res, next) {
      try {
         const result = await manageImageService.getInfo(req);
         const response = responseSuccess(result, `Get user's info successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   listCreate: async function (req, res, next) {
      try {
         const result = await manageImageService.listCreate(req);
         const response = responseSuccess(result, `Get list images were created by user id ${req.user.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   listSave: async function (req, res, next) {
      try {
         const result = await manageImageService.listSave(req);
         const response = responseSuccess(result, `Get list images were saved by user id ${req.user.id} successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
   delete: async function (req, res, next) {
      try {
         const result = await manageImageService.delete(req);
         const response = responseSuccess(result, `Delete image successfully`);
         res.status(response.statusCode).json(response);
      } catch (err) {
         next(err);
      }
   },
};