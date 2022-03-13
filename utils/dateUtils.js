const moment = require('moment');
const format = 'YYYY-MM-DD HH:mm:ss';

function getCurrentDateTime() {
    return moment.utc().format(format);
}

function convertToDateFormat(date) {
    return moment(date).format(format);
}

function durationInHours(startDate,endDate) {
    const end = new Date(convertToDateFormat(endDate))
    const start = new Date(convertToDateFormat(startDate))
    const hours = Math.abs(end - start) / (1000 * 60 * 60) % 24;
    return parseFloat(hours.toString()).toFixed(2);
}

module.exports = {
    getCurrentDateTime,
    convertToDateFormat,
    durationInHours,
};
