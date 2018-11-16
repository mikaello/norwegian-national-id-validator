open Jest;
open ExpectJs;
open Index;

describe("isValidIdNumberFormat", () => {
  test("eleven digits is valid", () =>
    expect(isValidIdNumberFormat("12345678901")) |> toBeTruthy
  );
  test("eleven digits with whitespace is valid", () =>
    expect(isValidIdNumberFormat("   12345678901  ")) |> toBeTruthy
  );
  test("ten digits is invalid", () =>
    expect(isValidIdNumberFormat("1234567890")) |> toBeFalsy
  );
  test("ten digits with whitespace is invalid", () =>
    expect(isValidIdNumberFormat("1234567890 ")) |> toBeFalsy
  );
  test("eleven characters with some non-digits is invalid", () =>
    expect(isValidIdNumberFormat("12345h67890")) |> toBeFalsy
  );
});

/*
 describe("isValidCheckDigits", () => {
   test("that valid check digits", () =>
     expect(isValidCheckDigits("01010107543")) |> toBeTruthy
   );
   test("that invalid check digits", () =>
     expect(isValidCheckDigits("01010107549")) |> toBeFalsy
   );
 });
 */

/*
 describe("getIdNumberType", () => {
   test("detect D-number", () =>
     expect(getIdNumberType("42059199212")) |> toEqual(Some(DNumber))
   );
   test("detect birth number", () =>
     expect(getIdNumberType("01010102576")) |> toEqual(Some(BirthNumber))
   );
 });
 */

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

describe("getBirthDate - functions", () => {
  test("birth date is found for D-number", () =>
    expect(possibleBirthDateOfDNumber("67047000642")) |> toBe("27041970")
  );

  test("birth date is found for birth number", () =>
    expect(possibleBirthDateOfBirthNumber("01010139461"))
    |> toBe("01011901")
  );

  test("birth date is found for H-number", ()
    /* TODO: Invalid check digits */
    =>
      expect(possibleBirthDateOfHNumber("01410100131")) |> toBe("01011901")
    );
});

describe("validateNorwegianIdNumber", () => {
  test("knows that no one could possibly be born on 29. Feb 1999", () =>
    expect(validateNorwegianIdNumber("29029900157")) |> toBe(false)
  );

  test("knows that it is possible to be born on 29. Feb 1996", () =>
    expect(validateNorwegianIdNumber("29029600013")) |> toBe(true)
  );

  test("does not accept future valid ID numbers", () =>
    expect(validateNorwegianIdNumber("24088951559")) |> toBe(false)
  );
});