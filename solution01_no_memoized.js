///
///  count(S,D)  Count how many configurations of D dices sum S
///
///  Recursive O( n * 6^n) solution without memoization.
///  Test is performed for 2 to 12 dices only
///
///
///  Author: Antonio Cabrera Perez (2022-01-30)


main();

function main() {
  for (let dices = 2; dices <= 14; dices += 2) {
    let sum = (dices + 6 * dices) / 2;
    console.time("time");
    console.log({ sum, dices, result: count(sum, dices)} );
    console.timeEnd("time");
    console.log("");
  }
}

function count(s, d) {
  if (s < d || d * 6 < s)
    return 0
  else if (d === 1)
    return 1
  else
    return [1, 2, 3, 4, 5, 6].map(n => count(s - n, d - 1)).reduce((a, b) => a + b)
}
