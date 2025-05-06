import express from 'express';
import { detailController } from '../controllers/detail.controller';
import protect from '../common/middleware/protect.middleware';

const detailRouter = express.Router();

// Tạo route CRUD
detailRouter.get('/check-save/:id', protect, detailController.save);
detailRouter.get('/comment/:id', protect, detailController.commentImage);
detailRouter.post('/comment/:id', protect, detailController.comment);
detailRouter.get('/:id', detailController.detailImage);



export default detailRouter;