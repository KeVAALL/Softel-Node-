import express from "express";
import * as employeeController from "./controller/employee.controller.js";
const router = express.Router();

router.get("/AssignEmployeeList/:FacilityId", employeeController.assignEmployeeList);
router.get("/", employeeController.getAllEmp);

router.post("/RoleAdd", employeeController.roleAdd);
router.put("/RoleEdit",employeeController.roleEdit);
router.put("/RoleDel",employeeController.roleDel);

router.post("/DesignationAdd",employeeController.designationAdd);
router.put("/DesignationEdit",employeeController.designationEdit);
router.put("/DesignationDel",employeeController.designationDel);

router.post("/CompetencyAdd",employeeController.competencyAdd);
router.put("/CompetencyEdit",employeeController.competencyEdit);
router.put("/CompetencyDel",employeeController.competencyDel);

export default router;
