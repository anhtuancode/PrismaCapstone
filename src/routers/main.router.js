import express from "express";
import { mainController } from "../controllers/main.controller";

const mainRouter = express.Router();

// Tạo route CRUD
mainRouter.get("/", mainController.findAll);
mainRouter.get("/search", mainController.search);



export default mainRouter;
