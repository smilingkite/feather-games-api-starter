// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

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

    const { user } = hook.params;

    hook.data.userId = user._id,
    hook.data.players = [{
      userId: user._id,
      hand: [] // maybe needs to be player_1_hand etc.
    }];
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    var cards = shuffle(Array(40).fill(0).map((e,i)=>i+1));

    hook.data.set = cards;

    return Promise.resolve(hook);
  };
};
