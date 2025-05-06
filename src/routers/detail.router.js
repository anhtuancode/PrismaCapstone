import express from 'express';
import { detailController } from '../controllers/detail.controller';
import protect from '../common/middleware/protect.middleware';

const detailRouter = express.Router();

// Tạo route CRUD
detailRouter.get('/check-save/:id', protect, detailController.save);
detailRouter.get('/:id', detailController.detailImage);
detailRouter.get('/comment/:id', protect, detailController.commentImage);


export default detailRouter;