// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const {score1, score2, players } = game;
        if (hook.data.game === undefined) return Promise.resolve(hook);
        if (score1 + score2 < 3) return Promise.resolve(hook);
        var player1 = players[0].userId;
        var player2 = players[1].userId;
        var winner;

        if (score1 > score2){
          winner = player1;
        } else {
          winner = player2;
        }

        hook.data.winner = winner;
        return Promise.resolve(hook);
      });
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

  };
};
