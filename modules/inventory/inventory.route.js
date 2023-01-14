import express from "express";
import * as inventoryController from "./controller/inventory.controller.js";
const router = express.Router();

router.get("/EquipmentList/:FacilityId/:EquipmentCategoryId", inventoryController.equipmentList);
router.get("/CategoryList/:FacilityId", inventoryController.categoryList);

router.post('/CategoryCheckListAdd',inventoryController.CategoryCheckListAdd);
router.put('/CategoryCheckListEdit/:id',inventoryController.CategoryCheckListEdit);
router.put('/CategoryCheckListDel/:id',inventoryController.CategoryCheckListDel);

router.post('/CategoryAdd',inventoryController.categoryAdd);
router.put('/CategoryEdit/:id',inventoryController.categoryEdit);
router.put('/CategoryDel/:id',inventoryController.categoryDel);

router.post('/AssetTypeAdd',inventoryController.assetTypeAdd);
router.put('/AssetTypeEdit/:id',inventoryController.assetTypeEdit);
router.put('/AssetTypeDel/:id',inventoryController.assetTypeDel);


export default router;
