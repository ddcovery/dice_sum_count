///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Iterative solution
///  Test is performed for 2 to 150 dice
///
///  Iterative solution generates all counts from count(1,1) to count(sum,dices)
///  taking into account that each state count(s,d) depends, at most, on the state
///  count(s-6, d-1). 
///  The tail recursion is ported easily to iterative version  keeping
///  the record of the previously calculated states into a circular array of 7 rows
///
///  Author: Antonio Cabrera Perez (2022-01-30)

main();

function main() {
  
  for (let dice = 2; dice <= 150; dice += 2) {
    let sum = (dice + 6 * dice) / 2;
    console.time("time");
    console.log({ sum, dice, result: count(sum, dice)} );
    console.timeEnd("time");
    console.log("");
  }
}

function count(totalSums, totalDice) {
  let counts = Counts(totalDice);

  for (let sum = 1; sum <= totalSums; sum++)
    for (let dice = 1; dice <= totalDice; dice++)
      if (sum < dice || dice * 6 < sum)
        counts.set(sum, dice, 0);
      else if (dice === 1)
        counts.set(sum, dice, 1);
      else {
        /* 3 times slower than for loop
            counts.set(sum, dice,
              [1, 2, 3, 4, 5, 6].map(side => (sum - side > 0) ? counts.get(sum - side, dice - 1) : 0).reduce((a, b) => a + b)
            )
        */
        let count_s_d = 0
        for (let side = 1; side <= 6; side++)
          count_s_d += (sum - side > 0) ? counts.get(sum - side, dice - 1) : 0;
        counts.set(sum, dice, count_s_d);
      }

  return counts.get(totalSums, totalDice);
}



/**
 * Implements the Counts table ( sums x dice ) optimized to store only the last
 * 6 sums 
 * @param {*} totalDice 
 * @returns 
 */
function Counts(totalDice) {
  let firstSum = 1;
  // Wich row is the "last row"
  let circular_offset = 0;
  // How many rows are maintained in the circular structure
  const circular_size = 7;
  // The rows of the circula structure
  const circular_counts = Array(circular_size).fill(void 0).map(_ => Array(totalDice).fill(0));

  return {
    get,
    set
  }
  function get(sum, dice) {
    return getSumRow(sum)[dice - 1];
  }
  function set(sum, dice, count) {
    //console.assert( sum - firstSum <= circular_size+1, "Empty intermediate 'count rows' are not allowed");
    if (sum - firstSum >= circular_size) scrollWindow();
    getSumRow(sum)[dice - 1] = count;
  }

  function scrollWindow() {
    //console.log("ScrollWindow", {base: firstSum});
    circular_offset = (circular_offset + 1) % circular_size;
    firstSum++;
    getSumRow(firstSum).fill(0);

  }

  function getSumRow(sum) {
    return circular_counts[(sum - firstSum + circular_offset) % circular_size];
  }


}