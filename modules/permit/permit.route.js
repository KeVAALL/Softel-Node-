import express from "express";
import * as permitController from "./controller/permit.controller.js";
const router = express.Router();

// router.get("/PermitDetailsPratice", permitController.permitDetailsPratice);
// router.get("/PermitDetails/:ptwId/:typeId", permitController.permitDetails);
// // router.put("/PermitIssue/:ptwId/:PTW_ISSUE", permitController.permitIssue);
// router.put(
//   "/PermitReject/:Id/:PTW_REJECTED_ISSUER",
//   permitController.permitReject
// );
// router.put(
//   "/PermitCancel/:Id/:PTW_CANCEL_BY_ISSUER",
//   permitController.permitCancel
// );
// router.put("/PermitApprove/:Id", permitController.permitApprove);
// router.get("/PermitTypeList/:FacilityId", permitController.permitTypeList);
// // router.get("/PermitBlocks/:block_id", permitController.permitBlocks);
// router.get(
//   "/SafetyListMeasure/:PermitTypeId",
//   permitController.permitSafetyMeasure
// );
// router.get("/LOTOAssets/:Ptw_Id", permitController.permitLOTOAssets);
// router.get(
//   "/IsolatedAssetCategories/:permitId",
//   permitController.permitIsolatedAssetCategories
// );
// router.get("/EmployeeLists/:employeeId", permitController.permitEmployeeLists);
// router.get("/AssetLists/:assetId", permitController.permitAssetLists);

// router.get("/PermitToWork", permitController.permitToWorkFetchList);
router.post(
  "/DateSelectionData",
  permitController.permitToWorkDateSelectionData
  // Selects permit between given dates
);
router.post(
  "/Details",
  permitController.permitToWorkDetails
  // Get Permit Details
);
router.post(
  "/PermitAssetList",
  permitController.permitAssetListResult
  // get Asset list
);
router.post(
  "/EmployeeList",
  permitController.permitEmployeeList
  // get Employee List
);

// Permit Create

router.post("/PermitCreate", permitController.permitCreate);
router.post("/PermitBlock", permitController.getBlockList);
router.post("/PermitTypeList", permitController.getPermitTypeList);

// Below 4 endpoints created from their php files in PTW
router.post("/AssetList", permitController.getAssetList);
router.post("/TBT", permitController.tbtList);
router.post("/TBTJobList", permitController.tbtJobList);
router.post("/UpdateEmployeeList", permitController.updateEmployeeList);

// Permit Issue

router.post("/PermitIssue", permitController.permitIssue);
router.post("/PermitReject", permitController.permitReject);
router.post("/PermitCancel", permitController.permitCancel);
router.post("/PermitApprove", permitController.permitApprove);
router.post("/Details", permitController.permitDetails);
router.get(
  "/SafetyListQuestion/:PermitId",
  permitController.permitSafetyQuestions
);
router.get(
  "/SafetyListMeasure/:PermitTypeId",
  permitController.permitSafetyMeasure
);

export default router;
