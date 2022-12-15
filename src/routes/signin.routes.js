import { Router } from "express";
import { postSignIn } from "../controllers/signin.controller.js";
import { validSignIn } from "../middlewares/2.signin.middleware.js";

const router = Router;

router.post("/signin", validSignIn, postSignIn);

export default router;