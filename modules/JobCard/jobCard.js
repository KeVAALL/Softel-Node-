import express from "express";
import * as jobCardController from "./job_card.controller.js";
import * as jobCardEditController from "./job_card_edit.controller.js";

const jobCardRouter = express.Router();

/**
 * @openapi
 * /JobCard/JobCard:
 *  get:
 *    summary: Get JobCard Details
 *    description: Returns all JobCard Users
 *    responses:
 *      '200':
 *          description: A JSON array of JobCards
 */

jobCardRouter.get("/JobCard", jobCardController.jobCardNormal);

// /**
//  * @openapi
//  * /JobCard/DateSelectionStatus:
//  *  post:
//  *    summary: Get JobCard Details based on Selected Date and JC Status
//  *    description: Returns all JobCard Users
//  *    parameters:
//  *     - name: JC_Status
//  *       in: formData
//  *       schema:
//  *         type: array
//  *         items: {
//  *             type: integer
//  *            }
//  *       required: true
//  *     - name: Start_Date
//  *       in: formData
//  *       schema:
//  *         type: string
//  *       required: true
//  *     - name: End_Date
//  *       in: formData
//  *       schema:
//  *         type: string
//  *       required: true
//  *    responses:
//  *      '200':
//  *          description: A JSON array of JobCard Details
//  */

/**
 * @openapi
 * /JobCard/DateSelectionStatus:
 *  post:
 *    summary: Get JobCard Details based on Selected Date and JC-Status
 *    description: Returns all JobCard Users
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              JC_Status:
 *                type: array
 *                items:
 *                  type: integer
 *              Start_Date:
 *                type: string
 *              End_Date:
 *                type: string
 *            examples:
 *              JC_Status: 1
 *              Start_Date: "2021-02-22"
 *              End_Date: "2021-03-16"
 *    responses:
 *      '200':
 *         description: A JSON Array of JobCard Details
 *      '404':
 *         description: Not Found
 *      '400':
 *         description: Bad Request
 *      '500':
 *         description: Server Problem
 */

jobCardRouter.post("/DateSelectionStatus", jobCardController.jobCardList);

/**
 * @openapi
 * /JobCard/DateSelection:
 *  post:
 *    summary: Get JobCard Details based on Selected Date
 *    description: Returns all JobCard Users
 *    parameters:
 *     - name: Start_Date
 *       in: formData
 *       schema:
 *         type: string
 *       required: true
 *     - name: End_Date
 *       in: formData
 *       schema:
 *         type: string
 *       required: true
 *    responses:
 *      '200':
 *          description: A JSON array of JobCard Details
 */

jobCardRouter.post(
  "/DateSelection",
  jobCardController.jobCardDateSelectionList
);

// /**
//  * @openapi
//  * /JobCard/JobCardDetails:
//  *  post:
//  *    summary: Get JobCard Details based on JobCard ID
//  *    description: Returns the JobCard User
//  *    parameters:
//  *     - name: jcId
//  *       in: formData
//  *       schema:
//  *         type: integer
//  *       required: true
//  *    responses:
//  *      '200':
//  *          description: A JSON array of JobCard User
//  *      '404':
//  *         description: Not Found
//  *      '400':
//  *         description: Bad Request
//  *      '500':
//  *         description: Server Problem
//  */

/**
 * @openapi
 * /JobCard/JobCardDetails:
 *  post:
 *    summary: Get JobCard Details based on JobCard ID
 *    description: Returns the JobCard User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              jcId:
 *                type: integer
 *            examples:
 *              jcId: 127
 *    responses:
 *      '200':
 *          description: A JSON array of JobCard User
 *      '404':
 *         description: Not Found
 *      '400':
 *         description: Bad Request
 *      '500':
 *         description: Server Problem
 */

jobCardRouter.post("/JobCardDetails", jobCardController.jobCardDetails);

/**
 * @openapi
 * /JobCard/EmployeeDetails:
 *  post:
 *    summary: Get Employee Details based on JobCreatedBy
 *    description: Returns Employee Details
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              jobCreatedBy:
 *                type: string
 *            examples:
 *              jobCreatedBy: prashant@softeltech.in
 *    responses:
 *      '200':
 *          description: A JSON array of Employee Details
 */

jobCardRouter.post("/EmployeeDetails", jobCardController.employeeDetails);

/**
 * @openapi
 * /JobCard/InsertComment:
 *  post:
 *    summary: Insert Comment in JobCard
 *    description: Inserts Comment and returns ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              moduleType:
 *                type: integer
 *              moduleRefId:
 *                type: integer
 *              moduleRefIdSecondary:
 *                type: integer
 *              comment:
 *                type: string
 *              postedBy:
 *                type: integer
 *              approvalStatus:
 *                type: integer
 *              closeCarryForwardStatus:
 *                type: integer
 *              postedByName:
 *                type: string
 *            examples:
 *              moduleType: 1
 *              moduleRefId: 0
 *              moduleRefIdSecondary: 1
 *              comment: Job Card Start
 *              postedBy: 12
 *              approvalStatus: 1
 *              closeCarryForwardStatus: 0
 *              postedByName:
 *    responses:
 *      '200':
 *          description: An Auto Generated ID
 */

jobCardRouter.post("/InsertComment", jobCardController.insertCommentCommon);

/**
 * @openapi
 * /JobCard/HistoryDetails:
 *  post:
 *    summary: Get History Details
 *    description: History Detail of Employee
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              moduleType:
 *                type: integer
 *              moduleRefId:
 *                type: integer
 *            examples:
 *              moduleType: 3
 *              moduleRefId: 127
 *    responses:
 *      '200':
 *          description: History Details
 */

jobCardRouter.post("/HistoryDetails", jobCardController.empHistoryDetails);

/**
 * @openapi
 * /JobCard/UpdateApproveJobCard:
 *  post:
 *    summary: Insert Comment in JobCard
 *    description: Inserts Comment and returns ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              moduleRefId:
 *                type: integer
 *              moduleRefIdSecondary:
 *                type: integer
 *              comment:
 *                type: string
 *              postedBy:
 *                type: integer
 *              closeCarryForwardStatus:
 *                type: integer
 *            examples:
 *              moduleRefId: 127
 *              moduleRefIdSecondary: 0
 *              comment: Job Card Start
 *              postedBy: 11
 *              closeCarryForwardStatus: 0
 *    responses:
 *      '200':
 *          description: An Auto Generated ID
 */

jobCardRouter.post(
  "/UpdateApproveJobCard",
  jobCardEditController.UpdateApproveJobCard
);

/**
 * @openapi
 * /JobCard/UpdateRejectJobCard:
 *  post:
 *    summary: Insert Comment in JobCard
 *    description: Inserts Comment and returns ID
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              moduleRefId:
 *                type: integer
 *              comment:
 *                type: string
 *              postedBy:
 *                type: integer
 *              closeCarryForwardStatus:
 *                type: integer
 *            examples:
 *              moduleRefId: 127
 *              comment: Job Card Start
 *              postedBy: 11
 *              closeCarryForwardStatus: 0
 *    responses:
 *      '200':
 *          description: An Auto Generated ID
 */

jobCardRouter.post(
  "/UpdateRejectJobCard",
  jobCardEditController.UpdateRejectJobCard
);

export default jobCardRouter;
