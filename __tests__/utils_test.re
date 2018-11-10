open Jest;
open Expect;
open Utils;

describe("charIsInt", () => {
  test("real ints is detected to be ints", () =>
    expect(charIsInt('0')) |> toBe(true)
  );
  test("letters are not detected to be ints", () =>
    expect(charIsInt('a')) |> toBe(false)
  );
  test("other symbols are not detectot to be ints", () =>
    expect(charIsInt('a')) |> toBe(false)
  );
});

describe("explode", () => {
  test("exploding string with only letters works", () =>
    expect(explode("star")) |> toEqual(['s', 't', 'a', 'r'])
  );
  test("exploding string with letter and numbers works", () =>
    expect(explode("r2d2")) |> toEqual(['r', '2', 'd', '2'])
  );
});

describe("stringIsAllInts", () => {
  test("check if string with all ints is detected", () =>
    expect(stringIsAllInts("2342342298")) |> toBe(true)
  );
  test("check if string with not all ints is found to be false", () =>
    expect(stringIsAllInts("oeu8e888890")) |> toBe(false)
  );
});

describe("Expect.Operators", () => {
  open! Expect.Operators;

  test("==", () =>
    expect(1 + 2) === 3
  );
});