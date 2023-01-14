import conn from "./connection.js";
import { SELECT, INSERT, UPDATE, DELETE } from "./constant.js";

export const runQuery = async (mode, sql) => {
  try {
    let [results, _] = await conn.execute(sql);

    if (mode == SELECT) {
      return { count: results.length, rows: results, status: "success" };
    }

    if (mode == INSERT) {
      return {
        count: results.affectedRows,
        insertId: results.insertId,
        status: "success",
      };
    }

    if (mode == UPDATE || mode == DELETE) {
      return { count: results.affectedRows, status: "success" };
    }
  } catch (error) {
    return { status: "failed", error: error };
  }
};
