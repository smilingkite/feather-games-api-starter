// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    // see if hook.data has { flip: Number }
    if (hook.data.flip === undefined) return Promise.resolve(hook);

    console.log(`flipping card ${hook.data.flip}`);

    const { user } = hook.params;

    // see if user is a player
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { players, turn, cards } = game;
        const playerIds = players.map((p) => (p.userId.toString()));
        const joined = playerIds.includes(user._id.toString());
        const hasTurn = playerIds.indexOf(user._id.toString()) === turn;

        if (!joined) {
          throw new errors.Unprocessable('You are not a player in this game, so you can not play!');
        }

        if (!hasTurn) {
          throw new errors.Unprocessable('It is not your turn to flip cards!');
        }

        const newCards = cards.map((c, i) => {
          if (i === hook.data.flip) {
            return Object.assign({}, c, { selected: true });
          }
          return c;
        });

        const selectedCards = newCards.filter((c) => (c.selected));

        if (selectedCards.length > 1) {
          throw new errors.Unprocessable('You can not flip more than 1 card!');
        }
        // if both users have flipped a card, check which card is the highest > that user gets the cards.
        if (selectedCards.length === 2) {
          const symbols = selectedCards.map((c) => (c.symbol))

          // set the lastCard
          hook.data.lastCard = hook.data.flip;

          // flip all the cards back to not selected
          // hook.data.cards = cards.map((c) => (
          //   Object.assign({}, c, { selected: false }))
          // );

          // next player's turn!
          let newTurn = turn + 1;
          if (newTurn + 1 > players.length) newTurn = 0;
          hook.data.turn = newTurn;
          // done! Next player's turn...
          return hook;
        }

        // flip the card :)
        hook.data.cards = newCards;
        // unset the lastCard
        hook.data.lastCard = null;

        console.log(hook.data);

        return Promise.resolve(hook);
      });
  };
};
