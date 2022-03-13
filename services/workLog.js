const db = require("../config/db");
const config = require("../config/config.json");
const database = process.env.NODE_ENV === 'test' ? config.test.database : config.dev.database

async function create(user, task, currentDateTime) {
    let userName = user.toLowerCase();
    let taskName = task.toLowerCase();

    let sql = `INSERT INTO ${database}.work_log(
      user_name,
      task_name,
      date_time
    )
    VALUES(
      '${userName}',
      '${taskName}',
      '${currentDateTime}'
    )
    `;

    return db.execute(sql);
}

async function remove(user) {
    let userName = user.toLowerCase();
    let sql = `DELETE FROM ${database}.work_log WHERE user_name = '${userName}'`;
    return db.execute(sql);
}


async function findUser(user) {
    let userName = user.toLowerCase();
    let sql = `
            SELECT * 
            FROM ${database}.work_log 
            WHERE user_name = '${userName}';`;
    return db.execute(sql);
}

module.exports = {
    create,
    remove,
    findUser
};
