import express from "express";
import * as facilityController from "./controller/facility.controller.js";
const router = express.Router();

router.get("/", facilityController.facilityList);

router.route("/FacilityList", facilityController.facilityList);

router.route("/BlockList/:FacilityId", facilityController.blockList);

export default router;
