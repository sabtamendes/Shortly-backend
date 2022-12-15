import { Router } from "express";
import { postSignUp } from "../controllers/signup.controller.js";
import { validSignUp } from "../middlewares/1.signup.mddleware.js";


const router = Router();

router.post("/signup", validSignUp, postSignUp);

export default router;