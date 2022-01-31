///
///  count(S,D)  Count how many configurations of D dice sum S
///
///  Recursive O( n * 6^n) solution without memoization.
///  Test is performed for 2 to 12 dice only
///
///
///  Author: Antonio Cabrera Perez (2022-01-30)

void main()
{
  import std.stdio : writefln;

  for (auto dice = 2; dice <= 14; dice += 2)
  {
    auto sum = (dice + 6 * dice) / 2;
    auto time = measure!(() {
      "sum:%d, dice:%d, result:%d".writefln(sum, dice, count(sum, dice));
    });
    "time:%d".writefln(time);
  }
}

ulong count(ulong s, ulong d)
{
  import std.algorithm : sum, fold;
  import std.range : iota;

  static sides = iota(1, 7);
  if (s < d || d * 6 < s)
    return 0;
  else if (d == 1)
    return 1;
  else
    return sides.fold!((total, side) => total + count(s - side, d - 1))(0UL);
}

auto measure(alias f)()
{
  import std.datetime.stopwatch : benchmark;

  auto bm = benchmark!(f)(1);
  return bm[0].total!"msecs";
}
