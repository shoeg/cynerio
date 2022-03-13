const lodash = require("lodash");
const task = require("../services/task");
const workLog = require("../services/workLog");
const dateUtils = require("../utils/dateUtils");

async function checkin(user, task) {
    try {
        if (!user || !task) {
           return "POST checkin failed - invalid input";
        }

        // check if user did checkin already
        const [workLogs, _] = await workLog.findUser(user);
        const isUserWorking = workLogs.length === 1;
        if (isUserWorking) {
            return "POST checkin failed - user did not checkout"
        }

        // add user to work log
        const currentDateTime = dateUtils.getCurrentDateTime()
        await workLog.create(user, task, currentDateTime);

    } catch (err) {
        console.error(`Error while checkin - `, err.message);
        throw err;
    }
}

async function checkout(user) {
    try {
        if (!user) {
            return "POST checkout failed - invalid input";
        }

        const [workLogs, _] = await workLog.findUser(user);
        console.log(workLogs);

        // check if user did not checkin before
        let isUserWorking = workLogs.length === 1;
        if (!isUserWorking) {
            return "POST checkout failed - user did not checkin";
        }

        // add user to completed tasks
        let currentDateTime = dateUtils.getCurrentDateTime()
        console.log(workLogs[0]);
        await task.create(workLogs[0], currentDateTime);
        await workLog.remove(user);

    } catch (err) {
        console.error(`Error while checkout - `, err.message);
        throw err;
    }
}

async function report() {
    try {
        const [tasks, _] = await task.getReport();
        let tasksByUser = lodash.groupBy(tasks, 'user_name');
        const report = {};

        for (const user in tasksByUser) {
            report[user] = [];
            tasksByUser[user].forEach(task => {
                const hours = dateUtils.durationInHours(task.start_date, task.end_date)
                report[user].push(`${task.task_name}: ${hours} hours`);
            });
        }
        return report;
    } catch (err) {
        console.error(`Error while report - `, err.message);
        throw err
    }
}

module.exports = {
    checkin,
    checkout,
    report
};
