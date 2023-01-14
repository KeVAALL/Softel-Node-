import { runQuery } from "../../../utility/db-operation.js";
import { SELECT } from "../../../utility/constant.js";

/*To get Facility List */
export const facilityList =  async (req, res) => {
  const sql = `SELECT Facility_id, Facility_name FROM fleximc_facility WHERE Facility_Is_Block = 0 AND Status = 1`;
  const result = await runQuery(SELECT ,sql);
  res.send(result);
};

/*To get Block List Of Any Facility */
export const blockList = async (req, res) => {
  const facility_id = req.params.FacilityId;
  const sql = `select Facility_id, Facility_name 
                    FROM fleximc_facility 
                    WHERE Status = 1 AND Facility_Is_Block = 1 AND Facility_Is_Block_of_id = ${facility_id}`;
  const result = await runQuery(SELECT, sql);
  res.send(result);
};
