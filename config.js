/*
 *
 * 
 *  Import and export configuration variables
 * 
 */
var environments = {};
environments.staging = {
    'httpport': 3000,
    'httpsport': 3001,
    'envName': 'staging'
}
environments.production = {
    'httpport': 5000,
    'httpsport': 5001,
    'envName': 'production'
}
// determine which env was passed as a command line argument
var currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''
// check that one of our curreny envs is being used
var envToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging
// export module
module.exports = envToExport
