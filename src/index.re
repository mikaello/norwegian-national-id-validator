type iDNumberType =
  | BirthNumber
  | DNumber
  | HNumber
  | FHNumber;

let isValidIdNumberFormat = idCandidate => {
  let trimmedIdCandidate = String.trim(idCandidate);
  if (String.length(trimmedIdCandidate) == 11
      && Utils.stringIsAllInts(trimmedIdCandidate)) {
    true;
  } else {
    false;
  };
};

let isValidCheckDigit = (factors, idNumber) =>
  switch (Belt.List.take(idNumber, List.length(factors))) {
  | None => false
  | Some(id) =>
    let productSum =
      List.fold_left2(
        (checkAcc, factor, idDigit) => checkAcc + factor * idDigit,
        0,
        factors,
        id,
      );

    productSum mod 11 == 0;
  };

let isValidCheckDigits = elevenDigits => {
  /* Prepending a '1' to factors to simplify calculation */
  let staticSequenceFirstCheckDigit = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
  let staticSequenceSecondCheckDigit = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

  let elevenDigitsArray =
    List.map(Utils.charToAsciiInt, Utils.explode(elevenDigits));

  isValidCheckDigit(staticSequenceFirstCheckDigit, elevenDigitsArray)
  && isValidCheckDigit(staticSequenceSecondCheckDigit, elevenDigitsArray);
};

let isValidId = idCandidate =>
  isValidIdNumberFormat(idCandidate) && isValidCheckDigits(idCandidate);

let getIdNumberType = elevenDigits =>
  if (!isValidId(elevenDigits)) {
    None;
  } else {
    let firstDigit = elevenDigits.[0] |> Utils.charToAsciiInt;
    let thirdDigit = elevenDigits.[2] |> Utils.charToAsciiInt;

    if (firstDigit == 8 || firstDigit == 9) {
      Some(FHNumber);
    } else if (firstDigit >= 4 && firstDigit <= 7) {
      Some(DNumber);
    } else if (thirdDigit == 4 || thirdDigit == 5) {
      Some(HNumber);
    } else {
      Some(BirthNumber);
    };
  };

let isValidBirthNumber = birthNumberCandidate =>
  getIdNumberType(birthNumberCandidate) == Some(BirthNumber);
let isValidDNumber = dNumberCandidate =>
  getIdNumberType(dNumberCandidate) == Some(DNumber);
let isValidHNumber = hNumberCandidate =>
  getIdNumberType(hNumberCandidate) == Some(HNumber);
let isValidFHNumber = fhNumberCandidate =>
  getIdNumberType(fhNumberCandidate) == Some(FHNumber);

let getBirthCenturyFromIdNumber = elevenDigitsWithDDMMYY => {
  let yy = String.sub(elevenDigitsWithDDMMYY, 4, 2) |> int_of_string;
  let ageGroupNumber =
    String.sub(elevenDigitsWithDDMMYY, 6, 3) |> int_of_string;

  if (ageGroupNumber >= 500 && ageGroupNumber < 750 && yy >= 54) {
    "18";
  } else if (ageGroupNumber >= 0
             && ageGroupNumber < 500
             || ageGroupNumber >= 900
             && yy >= 40) {
    "19";
  } else {
    "20";
  };
};

let getBirthDate = birthNumber => {
  let birthCentury = getBirthCenturyFromIdNumber(birthNumber);
  String.sub(birthNumber, 0, 4)
  ++ birthCentury
  ++ String.sub(birthNumber, 4, 2);
};

let possibleBirthDateOfBirthNumber = birthNumber => getBirthDate(birthNumber);
let possibleBirthDateOfHNumber = hNumber => {
  let correctedThirdDigit =
    (String.sub(hNumber, 2, 1) |> int_of_string) - 4 |> string_of_int;
  getBirthDate(
    String.sub(hNumber, 0, 2)
    ++ correctedThirdDigit
    ++ String.sub(hNumber, 3, 7),
  );
};
let possibleBirthDateOfDNumber = dNumber => {
  let correctedFirstDigit =
    (String.sub(dNumber, 0, 1) |> int_of_string) - 4 |> string_of_int;
  getBirthDate(correctedFirstDigit ++ String.sub(dNumber, 1, 10));
};

let possibleBirthDateOfIdNumber = idNumber =>
  switch (getIdNumberType(idNumber)) {
  | Some(BirthNumber) => Some(possibleBirthDateOfBirthNumber(idNumber))
  | Some(DNumber) => Some(possibleBirthDateOfDNumber(idNumber))
  | Some(HNumber) => Some(possibleBirthDateOfHNumber(idNumber))
  | Some(FHNumber) => None
  | None => None
  };

let possibleAgeOfPersonWithIdNumber = idNumber =>
  if (!isValidId(idNumber)) {
    None;
  } else {
    let birthDate = possibleBirthDateOfIdNumber(idNumber);
    let thisYear = Js.Date.make() |> Js.Date.getFullYear;

    switch (birthDate) {
    | None => None
    | Some(dateString) =>
      let date = String.sub(dateString, 0, 2) |> float_of_string;
      let month = (String.sub(dateString, 2, 2) |> float_of_string) -. 1.; /* Zero indexed */
      let year = String.sub(dateString, 4, 4) |> float_of_string;

      if (!Utils.isValidDate(~year, ~month, ~date, ())) {
        None;
      } else {
        Some(
          thisYear
          -. (dateString |> Js.Date.fromString |> Js.Date.getFullYear)
          |> int_of_float,
        );
      };
    };
  };

let validateNorwegianIdNumber = idNumber =>
  if (!isValidId(idNumber)) {
    false;
  } else {
    let idType = getIdNumberType(idNumber);

    if (idType == Some(FHNumber)) {
      true;
    } else {
      possibleAgeOfPersonWithIdNumber(idNumber) != None;
    };
  };