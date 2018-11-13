open Jest;
open Expect;
open Index;

/* STARTER PACK FOR REWRITING TESTS */

describe("Expect", () =>
  test("toBe", () =>
    expect(1 + 2) |> toBe(3)
  )
);

describe("Expect.Operators", () => {
  open! Expect.Operators;

  test("==", () =>
    expect(1 + 2) === 3
  );
});

describe("getBirthCenturyFromIdNumber", () => {
  /* ID numbers does not have valid check digits, otherwise valid */
  test("18th century for normal birthnumber", () =>
    expect(getBirthCenturyFromIdNumber("01015450131")) |> toBe("18")
  );
  test("19th century for normal birthnumber (low individual number)", () =>
    expect(getBirthCenturyFromIdNumber("01010100131")) |> toBe("19")
  );
  test("19th century for normal birthnumber (high individual number)", () =>
    expect(getBirthCenturyFromIdNumber("01045499931")) |> toBe("19")
  );
  test("20th century for normal birthnumber (low individual number)", () =>
    expect(getBirthCenturyFromIdNumber("01010150131")) |> toBe("20")
  );
  test("20th century for normal birthnumber (high individual number)", () =>
    expect(getBirthCenturyFromIdNumber("01010199931")) |> toBe("20")
  );
  test("19th century for D-number (high individual number)", () =>
    expect(getBirthCenturyFromIdNumber("42059199212")) |> toBe("19")
  );
});