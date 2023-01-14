import express from "express";
import * as linkPermitController from "./link_permit.controller.js";

const linkPermitRouter = express.Router();

// /**
//  * @openapi
//  * /LinkPermit/LinkPermit:
//  *  post:
//  *    summary: Get Link Permit List
//  *    description: Returns all Permits
//  *    parameters:
//  *     - name: facilityId
//  *       in: formData
//  *       schema:
//  *         type: integer
//  *       required: true
//  *     - name: checkpoint
//  *       in: formData
//  *       schema:
//  *         type: integer
//  *       required: true
//  *     - name: assetId
//  *       in: formData
//  *       schema:
//  *         type: integer
//  *       required: true
//  *    responses:
//  *      '200':
//  *          description: A JSON array of Permits
//  */

/**
 * @openapi
 * /LinkPermit/LinkPermit:
 *  post:
 *    summary: Get Employee Details based on JobCreatedBy
 *    description: Returns Employee Details
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              facilityId:
 *                type: integer
 *              checkpoint:
 *                type: integer
 *              assetId:
 *                type: integer
 *            examples:
 *              facilityId: 45
 *              checkpoint: 0
 *              assetId: 2
 *    responses:
 *      '200':
 *          description: A JSON array of Employee Details
 */

linkPermitRouter.post("/LinkPermit", linkPermitController.fetchPermitLinkList);

// /**
//  * @openapi
//  * /LinkPermit/FetchEmployeeDetails:
//  *  post:
//  *    summary: Get Employee Details
//  *    description: Returns all Employee
//  *    parameters:
//  *     - name: empEmailId
//  *       in: formData
//  *       schema:
//  *         type: string
//  *       required: true
//  *    responses:
//  *      '200':
//  *          description: A JSON array of Employee
//  */

/**
 * @openapi
 * /LinkPermit/FetchEmployeeDetails:
 *  post:
 *    summary: Get Employee Details based on JobCreatedBy
 *    description: Returns Employee Details
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              empEmailId:
 *                type: string
 *            examples:
 *              empEmailId: "heena.j@fleximc.com"
 *    responses:
 *      '200':
 *          description: A JSON array of Employee Details
 */

linkPermitRouter.post(
  "/FetchEmployeeDetails",
  linkPermitController.getEmployeeDetails
);

// /**
//  * @openapi
//  * /LinkPermit/FetchJobDetails:
//  *  post:
//  *    summary: Get Job Details
//  *    description: Returns Job Details
//  *    parameters:
//  *     - name: jobId
//  *       in: formData
//  *       schema:
//  *         type: integer
//  *       required: true
//  *    responses:
//  *      '200':
//  *          description: A JSON array of Job Details
//  */

/**
 * @openapi
 * /LinkPermit/FetchJobDetails:
 *  post:
 *    summary: Get Job Details
 *    description: Returns Job Details
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:      # Request body contents
 *            type: object
 *            properties:
 *              jobId:
 *                type: integer
 *            examples:
 *              empEmailId: 2990
 *    responses:
 *      '200':
 *          description: A JSON array of Job Details
 */

linkPermitRouter.post("/FetchJobDetails", linkPermitController.jobDetails);

export default linkPermitRouter;
