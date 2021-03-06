///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Recursive O( n * 6^n) solution without memoization.
///  Test is performed for 2 to 12 dice only
///
///
///  Author: Antonio Cabrera Perez (2022-01-30)

ulong count(ulong s, ulong d)
{
  import std.algorithm : sum, fold;
  import std.range : iota;

  static sides = [1, 2, 3, 4, 5, 6];
  if (s < d || d * 6 < s)
    return 0;
  else if (d == 1)
    return 1;
  else
    return sides.fold!((total, side) =>
        s > side ? total + count(s - side, d - 1) : total
    )(0UL);
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

auto measure(alias f)()
{
  import std.datetime.stopwatch : benchmark;

  auto bm = benchmark!(f)(1);
  return bm[0].total!"msecs";
}
