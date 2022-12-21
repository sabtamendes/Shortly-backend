import { Router } from "express";
import { getUser } from "../controllers/04.users.controllers.js";
import { tokenValidation } from "../middlewares/00.token.middlewares.js";
import { usersValidation } from "../middlewares/04.users.middlewares.js";

const router = Router();

router.get("/users/me", tokenValidation, usersValidation, getUser);

export default router;