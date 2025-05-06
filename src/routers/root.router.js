import express from "express";
import authRouter from "./auth.router";
import mainRouter from "./main.router";
import userRouter from "./user.router";
import manageImageRouter from "./manage-image.router";
import detailRouter from "./detail.router";

const rootRouter = express.Router();

rootRouter.use("/", mainRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/manage-image", manageImageRouter);
rootRouter.use("/detail", detailRouter)

export default rootRouter;
