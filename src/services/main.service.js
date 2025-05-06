import { BadRequestException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";

export const mainService = {
  findAll: async function (req) {
    let {page, pageSize} = req.query;
        page = Number(page);
        page = page > 0 ? page : 1;
        pageSize = Number(pageSize);

        const skip = (page - 1) * pageSize;

        const result = await prisma.hinh_anh.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {createdAt: "desc"},
        });

        const totalItem = await prisma.hinh_anh.count();

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: result || []
        };
  },
  search: async function (req) {
    let {page, pageSize, search} = req.query;
        page = Number(page);
        page = page > 0 ? page : 1;
        pageSize = Number(pageSize);
        search = search || '';

        const skip = (page - 1) * pageSize;

        const where = {ten_hinh:{contains: search}}

        console.log(where);

        const result = await prisma.hinh_anh.findMany({
            take: pageSize,
            skip: skip,
            orderBy: {createdAt: "desc"},
            where: where
        });

        const totalItem = await prisma.hinh_anh.count({
          where: where
        });

        const totalPage = Math.ceil(totalItem / pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalItem: totalItem,
            totalPage: totalPage,
            items: result || []
        };
  }
};
