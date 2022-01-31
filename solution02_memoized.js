///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Recursive solution with memoization
///  Test is performed for 2 to 150 dice
///
///
///  Author: Antonio Cabrera Perez (2022-01-30)


main();

function main() {
  for (let dice = 2; dice <= 150; dice += 2) {
    let sum = (dice + 6 * dice) / 2;
    console.time("time");
    console.log({ sum, dice, result: count(sum, dice) });
    console.timeEnd("time");
    console.log("");
  }
}

function count(s, d) {
  const countWithMemoization = memoizate((s, d) => {
    if (s < d || d * 6 < s)
      return 0
    else if (d === 1)
      return 1
    else
      return [1, 2, 3, 4, 5, 6].reduce((total, side) => total + countWithMemoization(s - side, d - 1), 0)
  });

  return countWithMemoization(s, d)
}


function memoizate(fn) {
  const cache = new Map();
  return (a, b) => {
    if (!has(a, b)) {
      value = fn(a, b);
      set(a, b, value);
      return value;
    } else {
      return get(a, b);
    }
  }
  function has(a, b) {
    return cache.has(a) && cache.get(a).has(b);
  }
  function get(a, b) {
    return has(a, b) ? cache.get(a).get(b) : void 0;
  }
  function set(a, b, value) {
    if (!cache.has(a)) cache.set(a, new Map());
    cache.get(a).set(b, value)
  }
}
