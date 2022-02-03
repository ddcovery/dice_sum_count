///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Brute force solution
///  Test is performed for 1 to 12 dice only
///
///  Algorithm fails when the sum of a dice configuration exceeds the floating point precission
///
///  Author: Antonio Cabrera Perez (2022-01-30)

main();

function main() {
  for (let dice = 1; dice <= 12; dice++) {
    let sum = Math.floor((dice + 6 * dice) / 2);
    console.time("time");
    console.log({ sum, dice, result: count(sum, dice) });
    console.timeEnd("time");
    console.log("");
  }
}

function count(s, d) {
  let count = 0
  enumerateAllVariationsSums(d)(sum => {
    if (sum === s) count++;
  })
  return count
}


function enumerateAllVariationsSums(total_dice) {
  return (consumeFunc) => {
    let diceVector = Array(total_dice).fill(0);
    let lastSum = 0;
    do {
      consumeFunc(lastSum + total_dice);

      setNextVariation(diceVector)
      lastSum = diceVector.reduce((t, s) => t + s, 0);
    } while (lastSum !== 0)

  }

  function setNextVariation(diceVector) {
    // <diceVector> is treated as a base 6 number:  next vector is generated adding 1 to the actual one
    for (let die = 0; die < diceVector.length; die++) {
      diceVector[die] = (diceVector[die] + 1) % 6;
      if (diceVector[die] != 0)
        break;
    }
  }

}
