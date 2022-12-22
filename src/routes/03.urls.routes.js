import { Router } from "express";
import { redirectUrlValidation, shortenValidation, urlBelongsToUserValidation, urlValidation } from "../middlewares/03.urls.middlewares.js";
import { tokenValidation } from "../middlewares/00.token.middlewares.js";
import { deleteUrl, getShortenUrls, postUrlShorten, redirectGetUrl } from "../controllers/03.urls.controllers.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, urlValidation, postUrlShorten);

router.get("/urls/:id", shortenValidation, getShortenUrls);

router.get("/urls/open/:shortUrl", redirectUrlValidation, redirectGetUrl); //visitas

router.delete("/urls/:id", tokenValidation, shortenValidation, urlBelongsToUserValidation, deleteUrl);

export default router;