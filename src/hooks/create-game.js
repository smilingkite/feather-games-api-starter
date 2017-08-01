// function shuffle(array) {
//   let counter = array.length;
//
//   while (counter > 0) {
//     let index = Math.floor(Math.random() * counter);
//     counter --;
//     let temp = array[counter];
//     array[counter] = array[index];
//     array[index] = temp;
//   }
//   return array;
// }
//
// function create_hand(cards) {
//   var hand_1 = (cards.slice(0, 3));
//   var hand_2 = (cards.slice(3, 6));
//   return hand_1, hand_2;
// }

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    const { user } = hook.params;

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    // var cards = shuffle(Array(40).fill(0).map((e,i)=>i+1));
    // var hand_1;
    // var hand_2;
    // hand_1, hand_2 = create_hand(cards);
    // hook.data.set = cards;

    hook.data.userId = user._id,
    hook.data.players = [{
      userId: user._id,
      hand: [] // maybe needs to be player_1_hand etc.
    }];

    return Promise.resolve(hook);
  };
};
