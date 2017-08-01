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

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    const shuffled_cards = shuffle(Array(40).fill(0).map((e,i)=>i+1));
    console.log(shuffled_cards);  //eslint-disable-line
    const { user } = hook.params;

    hook.data = {
      userId: user._id,
      players: [{
        userId: user._id,
        hand: []
      }],
      cards: shuffled_cards
        .map((symbol) => ({ selected: false, symbol:symbol })),
    };

    return Promise.resolve(hook);
  };
};
