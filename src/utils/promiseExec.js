const { exec } = require('child_process');
const { promisify } = require('util');

const promiseExec = promisify(exec);

module.exports = { promiseExec };
