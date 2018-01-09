/**
 * EmptyApiKey
 *
 * @class EmptyApiKey
 * @extends {Error}
 */
class EmptyApiKey extends Error {
  constructor(msg) {
    super(msg || 'No Api Key specified when create new PubgApi');
    this.name = this.constructor.name;
  }
}

/**
 * ProfileNotFound
 *
 * @class ProfileNotFound
 * @extends {Error}
 */
class ProfileNotFound extends Error {
  constructor(msg) {
    super(msg || 'Profile Not Found');
    this.name = this.constructor.name;
  }
}

/**
 * StatsNotFound
 *
 * @class StatsNotFound
 * @extends {Error}
 */
class StatsNotFound extends Error {
  constructor() {
    super('Stats not found');
    this.name = this.constructor.name;
  }
}

/**
 * APITemporarilyDisabled
 *
 * @class APITemporarilyDisabled
 * @extends {Error}
 */
class APITemporarilyDisabled extends Error {
  constructor(msg) {
    super(msg || 'API is temporarily disabled');
    this.name = this.constructor.name;
  }
}

module.exports = {
  EmptyApiKey,
  ProfileNotFound,
  StatsNotFound,
  APITemporarilyDisabled,
};
