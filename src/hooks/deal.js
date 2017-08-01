function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter --;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

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
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { players, hand, cards } = game; // eslint-disable-line no-unused-vars
        var shuffled_cards = shuffle(Array(40).fill(0).map((e,i)=>i+1));
        var hand_1, hand_2 = create_hand(shuffled_cards);// eslint-disable-line no-unused-vars
        var player_1, player_2 = find_players(game);// eslint-disable-line no-unused-vars

        hook.data.set = shuffled_cards;
        hook.data.userId = user._id,
        hook.data.players = [{
          userId: user._id,
          hand: []
        }];

        return Promise.resolve(hook);
      });
  };
};
