import { Router } from "express";
import { getUrlsById, getUrlsOPenShortUrl, postUrls } from "../controllers/urls.controller.js";
import { urlsValid } from "../middlewares/3.urls.middleware.js";


const router = Router;

router.post("/urls/shorten", urlsValid, postUrls);
router.get("urls/:id", getUrlsById);
router.get("urls/open/:shortUrl", getUrlsOPenShortUrl);

export default router;