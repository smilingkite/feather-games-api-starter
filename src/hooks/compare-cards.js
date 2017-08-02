// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// on selectedCards > compareCards > select winner of round.

function compareCards(Card1, Card2) {
  if (Card1 > Card2) return Card1 ;
  return Card2;
  // set 'won' attribute  on card to true;
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    console.log("compareCards hook called")
    if (hook.data.player.hand.selectedCard !== undefined) return Promise.resolve(hook);

    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { players, hand, cards } = game;

      });

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    // return Promise.resolve(hook);
  };
};
