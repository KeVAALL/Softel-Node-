export const SELECT = 1;
export const INSERT = 2;
export const UPDATE = 3;
export const DELETE = 4;

// JobCard Status
export const JC_OPEN = 0;
export const JC_CLOSE = 1;
export const JC_REJECT = 2;
export const JC_APPROVE = 3;
export const JC_AUTO_APPROVE = 4;
export const JC_Carry_Forward = 5;
export const JC_PTW_TIMEOUT = 6;

export const JC_NO_CARRY_FORWARD = 0;
export const JC_CARRY_FORWARD = 1;

// JobCard Button Status
export const buttonStatus = {
  JC_UPDATE_BUTTON: 1,
  JC_SUBMIT_BUTTON: 2,
  JC_START_BUTTON: 3,
};

export const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

export const moduleConstant = {
  JOB: 1,
  PTW: 2,
  JOBCARD: 3,
  PM_EXECUTION: 4,
  MODCLEAN: 5,
  SM_MASTER: 6,
  PO: 7,
  MRS: 8,
  MRS_RETURN: 9,
  SPECIAL_TOOL: 10,
  SM_ASSET: 11,
  S2S: 12,
  FM: 13,
  DGR: 14,
  DISTRIBUTION: 15,
  HOTO: 16,
  AUDIT: 17,
  MANPOWERTRANSFER: 18,
  CALIBRATION: 19,
  AUDIT_PLAN: 20,
  PMCheckPointMapping: 21,
  WARRANTYCLAIM: 22,
  REPORTBUILDER: 23,
  USERS: 24,
  EMPLOYEE: 25,
  PMSchedule: 26,
  PDMSchedule: 27,
  HOTOSchedule: 28,
};

export const linkPermit = {
  JOB_BELONG_TO_SELF: 0,
  JOB_BELONG_TO_PM: 1,
  JOB_BELONG_TO_HOTO: 2,
  JOB_BELONG_TO_AUDIT: 3,
  JOB_BELONG_TO_PDM: 4,
};
