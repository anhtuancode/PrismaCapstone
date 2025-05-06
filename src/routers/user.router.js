import express from 'express';
import { userController } from '../controllers/user.controller';
import protect from '../common/middleware/protect.middleware';
import uploadCloud from '../common/multer/cloud.multer';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get('/get-info',protect , userController.getInfo);
userRouter.put("/update", protect, uploadCloud.single('anh_dai_dien'), userController.update);
userRouter.post("/upload-images", protect, uploadCloud.single('duong_dan'), userController.uploadImage)
export default userRouter;