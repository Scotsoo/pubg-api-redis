const {REGION, SEASON, MATCH} = require('./src/util/constants');
const PubgAPI = require('./src/client');
const PubgAPIErrors = require('./src/pubg-errors');

module.exports = {
    PubgAPI,
    PubgAPIErrors,
    REGION,
    SEASON,
    MATCH
}
