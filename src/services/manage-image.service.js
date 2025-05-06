import {
  BadRequestException,
  UnAuthorizedException,
} from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const manageImageService = {
  getInfo: async function (req) {
    const user = req.user;
    delete user.mat_khau;
    return user;
  },
  listCreate: async function (req) {
    const user = req.user;
    const userId = user.id;

    if (!userId) throw new UnAuthorizedException("User isnt found");

    const result = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: userId,
      },
    });

    const count = await prisma.hinh_anh.count({
      where: {
        nguoi_dung_id: userId,
      },
    });

    return {
      count: count,
      result: result,
    };
  },
  listSave: async function (req) {
    const userId = Number(req.user.id);

    if (!userId) throw new UnAuthorizedException("User isnt found");

    const saveImages = await prisma.luu_anh.findMany({
      where:{
         nguoi_dung_id: userId
      },
      include:{
         hinh_anh:{
            select:{
               id: true,
               nguoi_dung_id: true, 
               ten_hinh: true,
               duong_dan: true,
               mo_ta: true
            }
         }
      }
    })

    if(saveImages.length === 0){
      return {
         message: "You haven't saved any images yet",
         data: []
     };
    } 

    return saveImages;
  },
  delete: async function (req) {
    const user = req.user;
    const userId = user.id;
    const imageId = Number(req.params.id);

    if (!userId) throw new UnAuthorizedException("User isn't found");

    const image = await prisma.hinh_anh.findUnique({
      where: {
        id: imageId,
      },
    });

    if (!image) throw new BadRequestException("Image not found");

    if (image.nguoi_dung_id !== userId)
      throw new BadRequestException(
        "User dont have premission to delete this images"
      );

    const imageDeleted = await prisma.hinh_anh.update({
      where: {
        id: imageId,
      },
      data:{
        isDeleted: true
      }
    });

    return imageDeleted
  },
};
