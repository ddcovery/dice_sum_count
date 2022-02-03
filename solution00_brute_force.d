/**
  count(S,D) Count how many configurations of D dice sum S

  Brute force version

  Test is performed for 1 to 12 dice only

  Run with unittest and invariants
  $ dmd -run  solution00_brute_force.d -o-
  Run in release mode
  $ dmd -run  solution00_brute_force.d --release -O -o- -check=off

  Author: Antonio Cabrera Perez (2022-02-03)
*/
module solution00_brute_force;

void main()
{
  import std.stdio : writefln;

  foreach (dice; 1 .. 13)
  {
    auto sum = (dice + 6 * dice) / 2;
    double result = 0.;
    auto time = measure!(() { result = count(sum, dice); });
    "sum:%d, dice:%d, result:%f, time:%d".writefln(sum, dice, result, time);
  }
}

/**
 Count how many configurations of <d> dice sum <s>
 */
double count(ulong s, ulong d)
{
  import std.algorithm : count, filter;

  return DiceSums(d).
    filter!(sum => sum == s).
    count;
}

unittest
{
  assert(count(1, 2) == 0.);
  assert(count(2, 2) == 1.);
  assert(count(12, 2) == 1.);
  assert(count(13, 2) == 0.);

  assert(count(1, 3) == 0.);
  assert(count(3, 3) == 1.);
  assert(count(10, 3) == 27.);
  assert(count(18, 3) == 1.);
  assert(count(19, 3) == 0.);

}

/**
 Range that generates the sums of all variations with repetitions of 6 values taken in groups of <diceCount>
 */
struct DiceSums
{

  this(ulong diceCount)
  {
    vector = new byte[diceCount];
  }

  bool empty() const @property
  {
    return endReached;
  }

  ulong front() const @property
  {
    return vectorSum + vector.length; // vector.length === diceCount 
  }

  void popFront()
  {
    import std.algorithm : sum;

    // <vector> is treated as a base 6 number:  next variation is generated adding 1 to actual one  
    foreach (die; 0 .. vector.length)
    {
      vector[die] = (vector[die] + 1) % 6;
      if (vector[die] != 0)
        break;
    }
    vectorSum = sum(vector);
    endReached = vectorSum == 0;
  }

  private
  {
    byte[] vector;
    ulong vectorSum = 0;
    bool endReached = false;
  }

  invariant ()
  {
    import std.algorithm : sum;

    assert(sum(vector) == vectorSum);
    assert(!endReached || vectorSum == 0, "endReached -> vectorSum==0");
  }
}

auto measure(alias f)()
{
  import std.datetime.stopwatch : benchmark;

  auto bm = benchmark!(f)(1);
  return bm[0].total!"msecs";
}
