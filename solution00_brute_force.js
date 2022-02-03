///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Brute force solution
///  Test is performed for 2 to 12 dice only
///
///  Algorithm fails when the sum of a dice configuration exceeds the floating point precission
///
///  Author: Antonio Cabrera Perez (2022-01-30)

main();

function main() {
  for (let dice = 2; dice <= 12; dice += 2) {
    let sum = (dice + 6 * dice) / 2;
    console.time("time");
    console.log({ sum, dice, result: count(sum, dice) });
    console.timeEnd("time");
    console.log("");
  }
}

function count(s, d) {
  let count = 0;
  let vr = vr_generator(d)
  do {
    if (vr.sum() === s) count++;
  } while (vr.next());
  return count;
}

// Generates variations with repetition of 6 elements taken in groups of <dice_count>.
function vr_generator(total_dice) {
  let vector = Array(total_dice).fill(0);
  let sum = 0;
  return {
    // internal summ refers to values between 0 and 5, but 1..6 is the expected one.
    sum: () => sum + total_dice,
    next,
  }
  function next() {
    // <vector> is treated as a base 6 number:  next variation is generated adding 1 to actual one
    for (let die = 0; die < vector.length; die++) {
      vector[die] = (vector[die] + 1) % 6;
      if (vector[die]!==0) break;
    }
    sum = vector.reduce((total, side) => total + side, 0)
    return sum !== 0; // All dice to 0
  }

}


