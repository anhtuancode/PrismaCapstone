import { BadRequestException, UnAuthorizedException } from "../common/helpers/exception.helper";
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

      if(!userId) throw new UnAuthorizedException("User isnt found");

      const result = await prisma.hinh_anh.findMany({
         where:{
            nguoi_dung_id: userId
         }
      })

      const count = await prisma.hinh_anh.count({
         where:{
            nguoi_dung_id: userId
         }
      })


      return {
         count: count,
         result: result
      };
   },
   listSave: async function (req) {
      const user = req.user;
      const userId = req.user;

      return "ok";
   },
   delete: async function (req) {   
      const user = req.user;
      const userId = user.id;
      const imageId = Number(req.params.id);

      console.log(imageId);

      if (!userId) throw new UnAuthorizedException("User isn't found");

      const result = await prisma.hinh_anh.findUnique({
         where:{
            nguoi_dung_id: userId,
            id: imageId
         }
      });

      if(!result) throw new BadRequestException("Image isnt found");

      const imageDeleted = await prisma.hinh_anh.delete({
         where:{
            id: imageId
         }
      })

      return imageDeleted;
   }
};