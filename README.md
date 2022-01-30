Algorithm to solve the **"How many configurations of 20 dices sums 70?"** problem answered in [es.quora.com](https://qr.ae/pGB07a)

The base algorithm is a recursive solution with a complexity order of **O(n * 6^n)**

```javascript
function count(s, d) {
  if (s < d || d * 6 < s)
    return 0
  else if (d === 1)
    return 1
  else
    return [1, 2, 3, 4, 5, 6].map(n => count(s - n, d - 1)).reduce((a, b) => a + b)
}
```

The code shows how performance can be improved drastically adding memoization with 3 files

* solution01_no_memoization.js
* solution02_memoization.js
* solution03_memoization_with_counters.js

**solution01_no_memoization.js**  runs the standard algorithm for 2, 4, 5, ..., 12 dices.

**solution02_memoization.js** runs the memoized version for 2,4,6, ..., 150 dices.

**solution03_memoization_with_counters.js** runs the memoized version for 2 to 150 dices adding some counters:

* callsCount:  How many times "count" function has been called.
* memoizedCount: How many values have been memoized.

#### How to run tests

You need nodejs on your system

If you use Ubuntu linux, you can install it with

> sudo apt install nodejs

To run tests just do

> $ node solution01_no_memoized

or

> $ node solution02_memoized

or

> $ node solution03_memoized_with_counters

Anyway,  I include results of this 3 executions (performed with my i5) on **results** folder


#### About the dataset

We only test 1 sum for each number of dices **d**: the sum for which we will find the most possible dices configurations (the worst case): 

`s = (d + 6d) / 2`

i.e.:

* count(14, 5)
  * 14 = (5 + 30) / 2
* count(21, 6)
  * 21 = (6 + 35) / 2
* count(28, 8):
* count(35, 10)
