import { BadRequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const detailService = {
    detailImage: async function (req) {
      const imageId = Number(req.params.id);

      const record = await prisma.hinh_anh.findUnique({
        where:{
            id: imageId
        },
        include:{
            nguoi_dung:{
                select:{
                    id: true,
                    email: true,
                    ho_ten: true, 
                    tuoi: true,
                    anh_dai_dien: true
                }
            }
        }
      })

      if(!record) throw new BadRequestException("Image not found")

      return record;
    },
    commentImage: async function (req) {
        const imageId = Number(req.params.id);
  
        const record = await prisma.binh_luan.findMany({
            where: {
                hinh_id: imageId
            },
            include:{
                nguoi_dung:{
                    select:{
                        id: true,
                        email: true,
                        ho_ten: true,
                        anh_dai_dien: true
                    }
                }
            },
            orderBy:{
                createdAt: 'desc'
            }
        });

        return record;
    },
    checkSaveStatus: async function (req) {
        const userId = req.user.id;
        const imageId = Number(req.params.id);

        const image = await prisma.hinh_anh.findUnique({
            where:{
                id: imageId
            }
        })

        if(!image) throw new BadRequestException("Image not found");

        const record = await prisma.luu_anh.findUnique({
            where:{
                nguoi_dung_id_hinh_id:{
                    nguoi_dung_id: userId,
                    hinh_id: imageId
                }
            }
        })

        if(!record) return null

        return record;
    },
    comment: async function (req) {
        const userId = req.user.id;
        const imageId = Number(req.params.id);
        const {noi_dung} = req.body;

        const isImage = await prisma.hinh_anh.findUnique({
            where:{
                id: imageId
            }
        })

        if(!isImage) throw new BadRequestException("Image not found");

        const record = await prisma.binh_luan.create({
            data:{
                nguoi_dung_id: userId,
                hinh_id: imageId,
                noi_dung: noi_dung,
                ngay_binh_luan: new Date()
            }
        })

        if(!record) throw new BadRequestException("Failed to save comment");

        return record;
    },
};