const queryString = require('query-string');
const Profile = require('./profile-object');

class PubgTrackerAPI {

  getProfileByNickname(nickname) {
    const playerName = encodeURIComponent(String(nickname).toLowerCase().replace(/\s/g, ''));
    const uri = `https://api.pubgtracker.com/v2/profile/pc/${playerName}`;

    return this.handleCache(uri)
      .then((content) => new Profile(content));
  }

  getAccountBySteamID(steamId) {
    const uri = `https://api.pubgtracker.com/v2/matches/pc/${steamId}`;

    return this.handleCache(uri);
  }

}

module.exports = PubgTrackerAPI;
