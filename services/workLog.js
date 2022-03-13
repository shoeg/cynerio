const db = require("../config/db");

async function create(user, task, currentDateTime) {
    let userName = user.toLowerCase();
    let taskName = task.toLowerCase();
    console.log(userName);
    console.log(taskName);

    let sql = `INSERT INTO work_log(
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
    console.log(userName);

    let sql = `DELETE FROM work_log WHERE user_name = '${userName}'`;
    return db.execute(sql);
}


async function findUser(user) {
    let userName = user.toLowerCase();
    console.log(userName);
    let sql = `
            SELECT * 
            FROM work_log 
            WHERE user_name = '${userName}';`;
    return db.execute(sql);
}

module.exports = {
    create,
    remove,
    findUser
};
