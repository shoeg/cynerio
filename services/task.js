const db = require("../config/db");
const dateUtils = require("../utils/dateUtils");
const config = require("../config/config.json");
const database = process.env.NODE_ENV === 'test' ? config.test.database : config.dev.database

async function getReport() {
    let sql = `
      SELECT 
      user_name, 
      task_name, 
      date_format(start_time, "%Y-%m-%d %H:%i:%s") start_date,
      date_format(end_time, "%Y-%m-%d %H:%i:%s") end_date
      FROM ${database}.tasks
      order by user_name;
    `
    return db.execute(sql);
}

async function create(workLog, currentDateTime) {
    let userName = workLog.user_name.toLowerCase();
    let taskName = workLog.task_name.toLowerCase();
    let startTime = dateUtils.convertToDateFormat(workLog.date_time);
    let endTime = currentDateTime;

    let sql = `INSERT INTO ${database}.tasks(
      user_name,
      task_name,
      start_time,
      end_time
    )
    VALUES(
      '${userName}',
      '${taskName}',
      '${startTime}',
      '${endTime}'
    )
    `;
    return db.execute(sql);
}

module.exports = {
    create,
    getReport,
};
