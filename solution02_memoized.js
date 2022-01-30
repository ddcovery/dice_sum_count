///
///  count(S,D)  Count how many configurations of D dices sum S
///
///  Recursive solution with memoization
///  Test is performed for 2 to 150 dices
///
///
///  Author: Antonio Cabrera Perez (2022-01-30)


main();

function main() {
  for (let dices = 2; dices <= 150; dices += 2) {
    let sum = (dices + 6 * dices) / 2;
    console.time("time");
    console.log({ sum, dices, result: count(sum, dices)} );
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
      return [1, 2, 3, 4, 5, 6].map(n => countWithMemoization(s - n, d - 1)).reduce((a, b) => a + b)
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
