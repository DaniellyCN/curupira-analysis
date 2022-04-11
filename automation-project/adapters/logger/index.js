const loggerColor = require('cli-color');

const log = text => console.log(new Date().toISOString() + loggerColor.green(" [info]") + ` - ${text}`);
const error = text => console.log(new Date().toISOString() + loggerColor.red(" [error]") + ` - ${text}`);

module.exports = { log, error };