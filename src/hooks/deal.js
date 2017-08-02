
function create_hand(cards) {
  var n = 3;
  var hand_1 = cards.slice(0, n);
  var hand_2 = cards.slice(n, 2*n);
  var hands = [hand_1, hand_2];
  return hands;
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    console.log("deal function started") // eslint-disable-line
    // if (hook.data.player.hand !== undefined) return Promise.resolve(hook);
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { players, cards } = game; // eslint-disable-line no-unused-vars

        var hands = create_hand(cards);// eslint-disable-line no-unused-vars
        var hand_1 = hands[0];
        var hand_2 = hands[1];

        hook.data = {
          hand1: hand_1,
          hand2: hand_2
        };

        // debugger

        return Promise.resolve(hook);
      });
  };
};
