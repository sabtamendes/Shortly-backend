import { Router } from "express";
import { signinValidation } from "../middlewares/02.signin.middlewares.js";
import { postSignIn } from "../controllers/02.signin.controllers.js";

const router = Router();

router.post("/signin", signinValidation, postSignIn);

export default router;