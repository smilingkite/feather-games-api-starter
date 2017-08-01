const { authenticate } = require('feathers-authentication').hooks;
const { restrictToAuthenticated } = require('feathers-authentication-hooks');

const { populate } = require('feathers-hooks-common');

const restrict = [
  authenticate('jwt'),
  restrictToAuthenticated(),
];

const createGame = require('../../hooks/create-game');

const ownerSchema = {
  include: {
    service: 'users',
    nameAs: 'owner',
    parentField: 'userId',
    childField: '_id',
  }
};

const joinGame = require('../../hooks/join-game');

const deal = require('../../hooks/deal');

const flipCard = require('../../hooks/flip-card');

const gameStats = require('../../hooks/game-stats');

module.exports = {
  before: {
    all: [ ...restrict ],
    find: [],
    get: [],
    create: [createGame()],
    update: [joinGame(), deal(), flipCard()],
    patch: [joinGame(), flipCard()],
    remove: []
  },

  after: {
    all: [populate({ schema: ownerSchema }), gameStats()], // changed
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
