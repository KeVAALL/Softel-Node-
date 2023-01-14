import express from "express";
import documentController from "./controller/document.controller.js";

const router = express.Router();

router.post("/Document", documentController.documentUpload);

export default router;
