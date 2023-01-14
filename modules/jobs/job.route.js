import express from "express";
import * as jobController from "./controller/job.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          response:
 *              workTypeList:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *                      message:
 *                          type: string
 *                          example: record found..
 *                      data:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  categoryId:
 *                                      type: integer
 *                                      example: 2
 *                                  categoryName:
 *                                      type: string
 *                                      example: inverter
 *                                  jobWorkTypes:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              id:
 *                                                  type: integer
 *                                                  example: 24
 *                                              workTypeName:
 *                                                  type: string
 *                                                  example: Inverter failure
 *          workTypeList:
 *              type: object
 *              properties:
 *                  categoryIds:
 *                      type: array
 *                      items:
 *                          type: integer
 *
 *          JobList:
 *              type: object
 *              properties:
 *                  facilityId:
 *                      type: integer
 *                      required: false
 *                  jobType:
 *                      type: integer
 *                      required: false
 *                  startDate:
 *                      type: string
 *                      required: false
 *                      example: 2022-08-26
 *                  endDate:
 *                      type: string
 *                      required: false
 *                      example: 2022-08-26
 *          createJob:
 *              type: object
 *              properties:
 *                  facilityId:
 *                      type: integer
 *                  jobType:
 *                      type: integer
 *                  blockId:
 *                      type: integer
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  breakdownTime:
 *                      type: string
 *                      required: false
 *                  createdBy:
 *                      type: integer
 *                  equipments:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              assetId:
 *                                  type: integer
 *                              categoryId:
 *                                  type: integer
 *                  assignTo:
 *                      type: integer
 *                  workType:
 *                      type: array
 *                      items:
 *                          type: integer
 *                  otherWorkTypeName:
 *                      type: string
 *                      required: false
 */

/**
 * @swagger
 * /Job/List:
 *  post:
 *      summary: This API return all jobs in plants
 *      description: This is used to get job list
 *      requestBody:
 *            name: Job List
 *            description: <b>Facility Id</b> is optional and data type is <b>integer</b>. By default it show all facility job. If value is set then it will only get that particular facility jobs.</br></br>
 *                         <b>Job type</b> is optional and data type is <b>integer</b>. By default it show all type of job e.g. BM, PM, PDM, HOTO. If value is set then it will only get that particular type of jobs.</br></br>
 *                         <b>Start date</b> and <b>End date</b> are optional and it's data type is <b>string</b>. By default it get current date records, but if you set value then will fetch data for that range only.</br></br>
 *                         date should be in <b>YYYY-MM-DD</b> format. If you provide start date then you must pass give end date too.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/JobList'
 *      responses:
 *              200:
 *                  description: Response should be 200 status code and return array data
 *                  example:
 *                      id: 10
 *                      name: amit
 *
 *
 */

/**
 * @swagger
 * /Job/Create:
 *  post:
 *      summary: This API create new job
 *      description: This is used to created job
 *      requestBody:
 *            required: true
 *            name: Create New Job
 *            description: <b>Facility Id</b> type is <b>integer</b>..</br></br>
 *                         <b>Job type</b> is optional and data type is <b>integer</b>. By default it show all type of job e.g. BM, PM, PDM, HOTO. If value is set then it will only get that particular type of jobs.</br></br>
 *                         <b>Start date</b> and <b>End date</b> are optional and it's data type is <b>string</b>. By default it get current date records, but it you set value then will fetch data for that range only.
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref:   '#/components/schemas/createJob'
 *      responses:
 *              200:
 *                  description: OK
 *
 */

/**
 * @swagger
 * /Job/WorkTypeList:
 *  post:
 *      summary: Get list of work type
 *      description: Work type is type of work which we going to do on site. Depending on what you select is going to suggest tools require for that work.
 *      requestBody:
 *            required: true
 *            name: categoryIds
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/workTypeList'
 *      responses:
 *              200:
 *                  name: Work Type List
 *                  description: ok
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/response/workTypeList'
 *
 */

router.post("/WorkTypeList", jobController.workTypeList);
router.post("/WorkType/ToolList", jobController.linkedToolsToWorkType);
router.post("/List", jobController.jobList);
router.post("/Create", jobController.createJob);
router.put("/Update", jobController.updateJob);
router.put("/Cancel", jobController.deleteJob);
router.post("/Details", jobController.jobDetails);

export default router;
