import express from 'express';
import { manageImageController } from '../controllers/manage-image.controller';
import protect from '../common/middleware/protect.middleware';

const manageImageRouter = express.Router();

// Tạo route CRUD
manageImageRouter.get('/getInfo', protect, manageImageController.getInfo);
manageImageRouter.get('/list-create', protect, manageImageController.listCreate);
manageImageRouter.get('/list-save', protect, manageImageController.listSave);
manageImageRouter.delete('/:id', protect, manageImageController.delete);



export default manageImageRouter;