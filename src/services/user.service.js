import bcrypt from "bcrypt";
import uploadResult from "../common/multer/cloud.result";
import prisma from "../common/prisma/init.prisma";
import { v2 as cloudinary } from "cloudinary";
import { BadRequestException } from "../common/helpers/exception.helper";

export const userService = {
  getInfo: async function (req) {
    const user = req.user;
    delete user.mat_khau;
    return user;
  },
  update: async function (req) {
    const user = req.user;
    const file = req.file;
    const userId = Number(user.id);
    const updateRecord = {};

    const { mat_khau, ho_ten, tuoi } = req.body;

    if (mat_khau) {
      const salt = await bcrypt.genSalt(10);
      updateRecord.mat_khau = await bcrypt.hash(mat_khau, salt);
    }
    if (ho_ten) {
      updateRecord.ho_ten = ho_ten;
    }
    if (tuoi) {
      updateRecord.tuoi = Number(tuoi);
    }

    if (user?.anh_dai_dien) {
      await cloudinary.uploader.destroy(user.anh_dai_dien);
    }

    if (file) {
      const uploadData = await uploadResult(file.buffer, "avatar");
      updateRecord.anh_dai_dien = uploadData.public_id;
    }

    const result = await prisma.nguoi_dung.update({
      where: {
        id: userId,
      },
      data: updateRecord,
    });

    return result;
  },
  uploadImage: async function (req) {
    const file = req.file;
    const user = req.user;
    const userId = user.id;
    const { mo_ta } = req.body;
    if (!file) throw new BadRequestException("File isnt found");

    const uploadData = await uploadResult(file.buffer, "articles");

    const newRecord = prisma.hinh_anh.create({
      data: {
        nguoi_dung_id: userId,
        ten_hinh: file.originalname,
        duong_dan: uploadData.secure_url,
        mo_ta: mo_ta,
      },
    });

    return newRecord;
  },
};
