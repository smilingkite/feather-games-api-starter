function find_players(game) {
  var player_1 = game.players[0];
  var player_2 = game.players[1];

  return player_1, player_2;
}

function create_hand(cards) {
  var hand_1 = (cards.slice(0, 3));
  var hand_2 = (cards.slice(3, 6));
  return hand_1, hand_2;
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (hook.data.player.hand !== undefined) return Promise.resolve(hook);
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { players, hand, cards } = game; // eslint-disable-line no-unused-vars

        var hand_1, hand_2 = create_hand(cards);// eslint-disable-line no-unused-vars
        var player_1, player_2 = find_players(game);// eslint-disable-line no-unused-vars

        // hook.data.set = cards;
        hook.data.userId = player_1._id, player_2._id,
        hook.data.players = [{
          userId: player_1._id,
          hand: hand_1
        },
        {
          userId: player_2._id,
          hand: hand_2
        }];

        return Promise.resolve(hook);
      });
  };
};
