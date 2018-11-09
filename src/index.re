type iDNumberType =
  | BirthNumber
  | DNumber
  | HNumber
  | FHNumber;

/* STARTER FOR REWRITING INDEX.JS */

let isCharInt = intCandidate => {
  let code = Char.code(intCandidate);
  code >= 48 && code <= 57; /* ASCII values */
};

let isValidIdNumberFormat = idCandidate => {
  let trimmedIdCandidate = String.trim(idCandidate);
  if (String.length(trimmedIdCandidate) != 11) {
    false;
  } else if (trimmedIdCandidate |> String.length != 11) {
    false;
         /* Should use isCharInt for every char to check for numbers */
  } else {
    true;
  };
};

let iDNumberType = elevenDigits =>
  if (String.length(elevenDigits) != 11) {
    None;
  } else {
    Some(FHNumber);
  };