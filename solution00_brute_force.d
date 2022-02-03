module solution00_brute_force;

///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Brute force algorithm
///  Test is performed for 2 to 14 dice only
///
///
///  Author: Antonio Cabrera Perez (2022-02-03)

double count(ulong s, ulong d)
{
  double count = 0;
  foreach (sum; Sums(d))
    if (sum == s)
      count++;
  return count;
}

void main()
{
  import std.stdio : writefln;

  for (auto dice = 2; dice <= 14; dice += 2)
  {
    auto sum = (dice + 6 * dice) / 2;
    double result = 0.;
    auto time = measure!(() { result = count(sum, dice); });
    "sum:%d, dice:%d, result:%f, time:%d".writefln(sum, dice, result, time);
  }
}



/// Generate the sums of all variations with repetition of 6 elements taken in groups of <diceCount> elements
struct Sums
{
  ulong diceCount;

  auto opApply(int delegate(ulong) loopFn)
  {
    // <vector> is treated as a base 6 number:  next variation is generated adding 1 to actual one
    byte[] vector = new byte[diceCount];
    ulong actualSum = 0;
    do
    {
      loopFn(actualSum + diceCount);
      actualSum = nextSum(vector);
    }
    while (actualSum != 0);

    return 1;
  }

  private ulong nextSum(ref byte[] vector)
  {
    import std.algorithm : sum;

    foreach (die; 0 .. vector.length)
    {
      vector[die] = (vector[die] + 1) % 6;
      if (vector[die] != 0)
        break;
    }
    return vector.sum();
  }

}

auto measure(alias f)()
{
  import std.datetime.stopwatch : benchmark;

  auto bm = benchmark!(f)(1);
  return bm[0].total!"msecs";
}

unittest
{
  assert(count(1, 2) == 0.);
  assert(count(2, 2) == 1.);
  assert(count(12, 2) == 1.);
  assert(count(13, 2) == 0.);

  assert(count(1, 3) == 0.);
  assert(count(3, 3) == 1.);
  assert(count(18, 3) == 1.);
  assert(count(19, 3) == 0.);
}
