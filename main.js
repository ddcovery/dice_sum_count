///
/// How may configurations of D dices sums S?
///
/// This example shows a recursive solution with memoization.
///
/// Author: Antonio Cabrera Pérez
///

main();

function main() {
  for (let dices = 10; dices <= 150; dices += 2) {
    // The worst case:  sum with more possible dice configurations.
    const sum = (dices + 6 * dices) / 2
    const { result, calls, memoizations } = test(sum, dices)

    console.log(`count(${sum},${dices}) is ${result} #calls:${calls} #memoizations:${memoizations}`)
  }
}
/**
 * Calculates How mny configurations of <d> dices sums <s> and obtains some additional stats
 * @return { Object }  An object with the properties:
 *   <result> How many configurations of <d> dices sums <s>
 *   <calls>  How many times the count function has been called
 *   <memoizations> How many values has been memoized.
 */
function test(s, d) {
  const add = (a, b) => a + b
  const memoizer = Memoizer()

  /**
   * How may configurations of <d> dices sums <s>?
   * @param {number} s the sum that configurations must add
   * @param {number} d number of dices of the configurations
   */
  const count = memoizer.wrapIt((s, d) => {
    if (s < d || d * 6 < s)
      return 0
    else if (d === 1)
      return 1
    else
      return [1, 2, 3, 4, 5, 6].map(n => count(s - n, d - 1)).reduce(add)
  })

  return {
    result: count(s, d),
    calls: memoizer.totalCalls(),
    memoizations: memoizer.totalMemoizations()
  };

}



function Memoizer() {
  const cache = BidiMap()
  let totalCalls = 0
  let totalMemoizations = 0

  return {
    wrapIt,
    totalCalls: () => totalCalls,
    totalMemoizations: () => totalMemoizations,
  }

  /**
   * Wrapps a <2 parameters fn function> with a <memoizer behaviour>
   * @param {*} fn The function to be wrapped
   * @returns A <2 parameters function> that wraps <fn>
   */
  function wrapIt(fn) {
    return (a, b) => {
      totalCalls++
      if (!cache.has(a, b)) {
        cache.set(a, b, fn(a, b))
        totalMemoizations++
      }
      return cache.get(a, b)
    }
  }
}

function BidiMap() {
  const valueByAB = new Map();
  return {
    has,
    get,
    set,
  };
  function has(a, b) {
    let valueByB = valueByAB.get(a)
    return valueByB!==void 0 && valueByB.has(b)
  }
  function get(a, b) {
    let valueByB = valueByAB.get(a);
    return (valueByB && valueByB.has(b)) ? valueByB.get(b) : void 0;
  }
  function set(a, b, value) {
    if (!valueByAB.has(a))
      valueByAB.set(a, new Map())
    valueByAB.get(a).set(b, value)
  }

}