///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Recursive O( n * 6^n) solution without memoization.
///  Test is performed for 2 to 12 dice only
///
///
///  Author: Antonio Cabrera Perez (2022-01-30)

main();

function main() {
  for (let dice = 2; dice <= 14; dice += 2) {
    let sum = (dice + 6 * dice) / 2;
    console.time("time");
    console.log({ sum, dice, result: count(sum, dice) });
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
    return [1, 2, 3, 4, 5, 6].reduce((total, n) => total + count(s - n, d - 1), 0)
}
