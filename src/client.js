/* eslint-disable constructor-super */
const Promise = require('bluebird');
const request = require('request-promise');

const {RedisCache, NoCache} = require('./cache');
const {EmptyApiKey, ProfileNotFound, APITemporarilyDisabled, APIRateLimitError} = require('./pubg-errors');
const PubgTrackerAPI = require('./api/pubg-tracker-api');

class Client extends PubgTrackerAPI {

  constructor({apikey, redisConfig}) {
    super();

    this.GAME = 'PUBG';

    if (!apikey) {
      throw new EmptyApiKey(apikey);
    }

    if (redisConfig) {
      this.cache = new RedisCache(redisConfig);
    } else {
      this.cache = new NoCache();
    }

    this.apikey = apikey;
    this.requestHeaders = {
      'TRN-Api-Key': this.apikey,
    };
  }

  createKey(uri) {
    return `${this.GAME};${uri}`;
  }

  handleCache(uri) {
    const key = this.createKey(uri);

    return this.cache.get(key)
      .then((content) => {
        if (!content) {
          return this.makeHttpRequest(uri);
        }
        return JSON.parse(content);
      });
  }

  makeHttpRequest(uri) {
    let data;
    let requestData = {
      uri,
      headers: this.requestHeaders,
      method: 'GET',
      resolveWithFullResponse: true
    }
    return Promise.resolve(request(requestData))
      .then(({body, headers}) => {
        // let minuteLeft = headers['x-ratelimit-remaining-minute'];
        console.log(minuteLeft);
        data = this.resolveBody(body);

        const key = this.createKey(uri);

        return this.cache.set(key, body);
      })
      .then(() => data);
  }

  resolveBody(requestBody) {
    let data;
    try {
      data = JSON.parse(requestBody);
    } catch (err) {
      throw new APIParseError(err, requestBody)
    }
    if(data.error){
      let error = ProfileNotFound;
      if (data.code === 3) {
        throw new APITemporarilyDisabled(data.error)
      } else {
        throw new ProfileNotFound(data.error);
      }
    } else if (data.message && data.message.indexOf('API Rate limit exceeded')) {
      throw new APIRateLimitError(data.message);
    }
    return data;
  }
}

module.exports = Client;
