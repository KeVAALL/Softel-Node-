import { Sequelize } from "sequelize";

const connection = new Sequelize("softel_cmms", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  dialectOptions: { useUTC: false },
  // timezone: "+05:30",
});

/**
 * Import Modules here
 */
import AssetsModel from "../modules/inventory/model/assets.model.js";
import JobModel from "../modules/jobs/model/jobs.model.js";
import JobAssociatedWorkTypeModel from "../modules/jobs/model/job_associated_work_type.model.js";
import JobMappingAssetModel from "../modules/jobs/model/job_mapping_assets.model.js";
import JobWorkTypeModel from "../modules/jobs/model/job_work_type.model.js";
import WorkTypeAssociatedToolModel from "../modules/jobs/model/work_type_associated_tool.model.js";
import WorkTypeMasterAssetModel from "../modules/jobs/model/work_type_master_assets.model.js";
import FacilityModel from "../modules/facility/model/facility.model.js";
import AssetCategoryModel from "../modules/inventory/model/asset_category.model.js";
import UserModel from "../modules/employee/model/users.model.js";
import hotoExecutionModel from "../modules/LinkPermit/model/hoto_execution.model.js";
import hotoScheduleModel from "../modules/LinkPermit/model/hoto_schedule.model.js";
import pmScheduleModel from "../modules/LinkPermit/model/pm_schedule.model.js";
import ticketModel from "../modules/LinkPermit/model/ticket.model.js";
import EmployeeDetailsModel from "../modules/LinkPermit/model/employee_details.model.js";
import PermitModel from "../modules/LinkPermit/model/permits.model.js";
import PermitAssetListsModel from "../modules/LinkPermit/model/permitassetlists.model.js";
import tbtModel from "../modules/permit/model/tbt.model.js";
import tbtRiskAssessmentModel from "../modules/permit/model/tbtriskassessment.model.js";
import tbtjoblistModel from "../modules/permit/model/tbtjoblist.model.js";
import JobCardModel from "../modules/JobCard/model/job_card.model.js";
import JobCardFilesModel from "../modules/JobCard/model/job_card_files.model.js";
import JobCardAssociatedStandardActionModel from "../modules/JobCard/model/job_card_associated_standard_action.model.js";
import JobCardAssetCategoryModel from "../modules/JobCard/model/asset_category.model.js";
import HistoryTableModel from "../modules/JobCard/model/history_table.model.js";
// import PermitModel from "../modules/permit/model/permits.model.js";
import PermitBlockModel from "../modules/permit/model/permitblocks.model.js";
import PermitEmployeeListsModel from "../modules/permit/model/permitemployeelists.model.js";
import PermitIsolatedAssetCategoriesModel from "../modules/permit/model/permitisolatedassetcategories.model.js";
import PermitSafetyQuestionsModel from "../modules/permit/model/permitsafetyquestions.model.js";
import PermitTypeListModel from "../modules/permit/model/permittypelist.model.js";
import PermitTypeSafetyMeasureModel from "../modules/permit/model/permittypesafetymeasures.model.js";
import PermitIsolatedAssetModel from "../modules/JobCard/model/permitisolatedasset.model.js";
import PermitLotoAssetModel from "../modules/JobCard/model/permitlotoasset.model.js";
import StandardActionModel from "../modules/JobCard/model/standard_actions.model.js";
import WorkTypeAssociatedToJobModel from "../modules/JobCard/model/work_type_associated_to_job.model.js";
import EmployeeModel from "../modules/JobCard/model/employee.model.js";
import EmployeeListModel from "../modules/JobCard/model/employee_list.model.js";
import { cookie } from "express-validator";

/**
 * passing connection object to all modules
 */
const Job = JobModel(connection, Sequelize);
const JobAssociatedWorkType = JobAssociatedWorkTypeModel(connection, Sequelize);
const JobMappingAsset = JobMappingAssetModel(connection, Sequelize);
const JobWorkType = JobWorkTypeModel(connection, Sequelize);
const WorkTypeAssociatedTool = WorkTypeAssociatedToolModel(
  connection,
  Sequelize
);
const WorkTypeMasterAsset = WorkTypeMasterAssetModel(connection, Sequelize);
const Facility = FacilityModel(connection, Sequelize);
const AssetCategory = AssetCategoryModel(connection, Sequelize);
const User = UserModel(connection, Sequelize);
const EmployeeDetails = EmployeeDetailsModel(connection, Sequelize);
const Permit = PermitModel(connection, Sequelize);
const PermitSafetyQuestions = PermitSafetyQuestionsModel(connection, Sequelize);
const PermitIsolatedAssetCategories = PermitIsolatedAssetCategoriesModel(
  connection,
  Sequelize
);
const Assets = AssetsModel(connection, Sequelize);
const PermitAssetLists = PermitAssetListsModel(connection, Sequelize);
const PermitTypeList = PermitTypeListModel(connection, Sequelize);
const TBT = tbtModel(connection, Sequelize);
const tbtRiskAssessment = tbtRiskAssessmentModel(connection, Sequelize);
const tbtJobList = tbtjoblistModel(connection, Sequelize);
const hotoExecution = hotoExecutionModel(connection, Sequelize);
const hotoSchedule = hotoScheduleModel(connection, Sequelize);
const pmSchedule = pmScheduleModel(connection, Sequelize);
const Ticket = ticketModel(connection, Sequelize);
const JobCard = JobCardModel(connection, Sequelize);
const JobCardFiles = JobCardFilesModel(connection, Sequelize);
const JobCardAssociatedStandardAction = JobCardAssociatedStandardActionModel(
  connection,
  Sequelize
);
const JobCardAssetCategory = JobCardAssetCategoryModel(connection, Sequelize);
const HistoryTable = HistoryTableModel(connection, Sequelize);
const PermitIsolatedAsset = PermitIsolatedAssetModel(connection, Sequelize);
const PermitLotoAsset = PermitLotoAssetModel(connection, Sequelize);
const PermitSafetyMeasure = PermitTypeSafetyMeasureModel(connection, Sequelize);
const StandardAction = StandardActionModel(connection, Sequelize);
const WorkTypeAssociatedToJob = WorkTypeAssociatedToJobModel(
  connection,
  Sequelize
);
const Employee = EmployeeModel(connection, Sequelize);
const EmployeeList = EmployeeListModel(connection, Sequelize);

/**
 * Define modules relationship here
 */

// Common
Employee.hasMany(HistoryTable, { foreignKey: "postedBy" });
HistoryTable.belongsTo(Employee, { foreignKey: "postedBy" });

// Link Permit
Permit.hasMany(PermitAssetLists, { sourceKey: "id", foreignKey: "ptwId" });
PermitAssetLists.belongsTo(Permit, { targetKey: "id", foreignKey: "ptwId" });

Job.hasMany(Ticket, { sourceKey: "belongsTo", foreignKey: "ticketId" });
Ticket.belongsTo(Job, { targetKey: "belongsTo", foreignKey: "ticketId" });

Ticket.hasMany(hotoExecution, { sourceKey: "executionId", foreignKey: "id" });
hotoExecution.belongsTo(Ticket, {
  targetKey: "executionId",
  foreignKey: "id",
});

hotoExecution.hasMany(hotoSchedule, {
  sourceKey: "scheduleId",
  foreignKey: "id",
});
hotoSchedule.belongsTo(hotoExecution, {
  targetKey: "scheduleId",
  foreignKey: "id",
});

// JobCard
Job.hasOne(JobCard, { sourceKey: "id", foreignKey: "jobId" });
JobCard.belongsTo(Job, { targetKey: "id", foreignKey: "jobId" });

Job.hasOne(Permit, { foreignKey: "jobId" });
Permit.belongsTo(Job, { foreignKey: "jobId" });

Job.hasMany(JobMappingAsset, { foreignKey: "jobId" });
JobMappingAsset.belongsTo(Job, { foreignKey: "jobId" });

JobCard.hasMany(HistoryTable, { sourceKey: "id", foreignKey: "moduleRefId" });
HistoryTable.belongsTo(JobCard, {
  targetKey: "id",
  foreignKey: "moduleRefId",
});

Permit.hasMany(JobCard, { sourceKey: "id", foreignKey: "PTW_id" });
JobCard.belongsTo(Permit, { targetKey: "id", foreignKey: "PTW_id" });

// Permit.hasMany(PermitAssetLists, { foreignKey: "PTW_id" });
// PermitAssetLists.belongsTo(Permit, { foreignKey: "PTW_id" });

AssetCategory.hasMany(JobMappingAsset, { foreignKey: "assetCategoryId" });
JobMappingAsset.belongsTo(AssetCategory, { foreignKey: "assetCategoryId" });

AssetCategory.hasMany(JobWorkType, { foreignKey: "equipmentCat" });
JobWorkType.belongsTo(AssetCategory, { foreignKey: "equipmentCat" });

JobWorkType.hasMany(WorkTypeAssociatedToJob, { foreignKey: "workTypeId" });
WorkTypeAssociatedToJob.belongsTo(JobWorkType, { foreignKey: "workTypeId" });

StandardAction.hasMany(JobCardAssociatedStandardAction, {
  foreignKey: "standardActionId",
});
JobCardAssociatedStandardAction.belongsTo(StandardAction, {
  foreignKey: "standardActionId",
});

//Job Table
Job.belongsTo(User, { as: "creator", foreignKey: "createdBy" });
Job.belongsTo(User, { as: "updater", foreignKey: "updatedBy" });
Job.belongsTo(User, { as: "assignee", foreignKey: "assignedId" });
Job.belongsTo(Facility, { as: "facility", foreignKey: "facilityId" });
Job.belongsTo(Facility, { as: "block", foreignKey: "blockId" });

//AssetCategory Table
AssetCategory.hasMany(JobWorkType, { foreignKey: "equipmentCategoryId" });

//Facility Table
Facility.hasMany(Job, { as: "facility", foreignKey: "facilityId" });
Facility.hasMany(Job, { as: "block", foreignKey: "blockId" });

//User Table
User.hasMany(Job, { as: "creator", foreignKey: "createdBy" });
User.hasMany(Job, { as: "updater", foreignKey: "updatedBy" });
User.hasMany(Job, { as: "assignee", foreignKey: "assignedId" });

/**
 * Export Modules
 */
export default {
  Job,
  JobAssociatedWorkType,
  JobMappingAsset,
  JobWorkType,
  WorkTypeAssociatedTool,
  WorkTypeMasterAsset,
  Facility,
  Assets,
  AssetCategory,
  User,
  EmployeeDetails,
  Permit,
  PermitTypeList,
  PermitAssetLists,
  TBT,
  tbtRiskAssessment,
  tbtJobList,
  hotoExecution,
  hotoSchedule,
  pmSchedule,
  Ticket,
  JobCard,
  JobCardFiles,
  JobCardAssociatedStandardAction,
  JobCardAssetCategory,
  HistoryTable,
  PermitIsolatedAsset,
  PermitLotoAsset,
  PermitSafetyQuestions,
  PermitIsolatedAssetCategories,
  PermitSafetyMeasure,
  StandardAction,
  WorkTypeAssociatedToJob,
  Employee,
  EmployeeList,
};
