import { BadRequestException, UnAuthorizedException } from "../common/helpers/exception.helper";
import prisma from "../common/prisma/init.prisma";
import bcrypt from "bcrypt";
import transporter from "../common/nodemailer/init.nodemailer";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";
import tokenService from "./token.service";
import jwt from "jsonwebtoken";


export const authService = {
   register: async (req) =>{
      const {email, mat_khau, ho_ten, tuoi} = req.body;

      const userExist = await prisma.nguoi_dung.findUnique({
         where:{
            email: email
         }
      });

      if(userExist) throw new BadRequestException("Email is exist please choose another one");

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(mat_khau, salt);

      const newUser = await prisma.nguoi_dung.create({
         data:{
            email: email,
            ho_ten: ho_ten,
            mat_khau: hashPassword,
            tuoi: tuoi
         }
      })
      delete newUser.mat_khau;

      const info = await transporter.sendMail({
         from: 'anhtuan220903@gmail.com', 
         to: email, 
         subject: "Register account successfully", 
         html:`
            <h1 style="color:red">Thanks for your register ${ho_ten}</h1>
         `,
      });

      return newUser;
   },
   login: async (req) =>{
      const {email, mat_khau} = req.body;

      const userExist = await prisma.nguoi_dung.findUnique({
         where:{
            email: email
         }
      })

      if(!userExist) throw new BadRequestException("Email doesn't exist. please register first and login again");

      if(!userExist?.mat_khau) throw new BadRequestException("Please login with google or facebook");

      const isPassword = await bcrypt.compare(mat_khau, userExist.mat_khau);

      if(!isPassword) throw new BadRequestException("Password or Email is wrong, please check again");

      const userToken = tokenService.createToken(userExist.id);

      return userToken;
   },
   forgotPassword: async (req) =>{
      const {email, mat_khau, confirm_mat_khau} = req.body;

      const userExist = await prisma.nguoi_dung.findUnique({
         where:{
            email: email
         }
      })

      if(!userExist) throw new BadRequestException("Email doesn't exist. please register first and login again");

      if(mat_khau != confirm_mat_khau) throw new BadRequestException("Password and Confirm Password dont match, please fill again");

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(mat_khau, salt);

      const updateUser = await prisma.nguoi_dung.update({
         where:{
            id: userExist.id
         },
         data:{
            mat_khau: hashPassword
         }
      });

      return updateUser;
   },
   refreshToken: async (req) => {
      const { accessToken, refreshToken } = req.body;
      if (!accessToken) throw new UnAuthorizedException("Dont have accessToken");
      if (!refreshToken)
        throw new UnAuthorizedException("Dont have refreshToken");
  
      const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const decodeAccessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
        ignoreExpiration: true,
      });
  
      if (decodeAccessToken.userId !== decodeRefreshToken.userId)
        throw new UnAuthorizedException("Token isnt suitable");
  
      const tokens = tokenService.createToken(decodeAccessToken.userId);
  
      return tokens;
   },
};