import { Router } from "express";
import { signupValidation } from "../middlewares/01.signup.middlewares.js";
import { postSignup } from "../controllers/01.signup.controllers.js";

const router = Router();

router.post("/signup", signupValidation, postSignup);

export default router;