export function diffYears(startDate: Date, endDate: Date) {
  const yStart = startDate.getFullYear();
  const mStart = startDate.getMonth();
  const dStart = startDate.getDate();

  const yEnd = endDate.getFullYear();
  const mEnd = endDate.getMonth();
  const dEnd = endDate.getDate();

  const diff = yStart - yEnd;
  if (mEnd > mStart || (mEnd === mStart && dEnd > dStart)) {
    return diff - 1;
  }

  return diff;
}

export function isValidDate(
  date: Date,
  expectedYear: string,
  expectedMonth: string,
  expectedDay: string,
): boolean {
  return (
    date.getFullYear() === Number(expectedYear) &&
    date.getMonth() + 1 === Number(expectedMonth) &&
    date.getDate() === Number(expectedDay)
  );
}

type IDNumberType = 'birthNumber' | 'DNumber' | 'HNumber' | 'FHNumber';

/**
 * Checks if the given value is a valid Norwegian national identity number.
 * @returns `true` for valid, and `false` for invalid ID-number.
 */
export function validateNorwegianIdNumber(idNumber: string): boolean {
  const trimmed = idNumber.trim();
  if (isNaN(Number(trimmed))) return false;
  if (trimmed.length !== 11) return false;
  if (!isValidCheckDigits(trimmed)) return false;
  const type = idNumberType(trimmed);
  if (type === 'FHNumber') return true;
  else return possibleAgesOfPersonWithIdNumber(trimmed).length > 0;
}

export function possibleAgesOfPersonWithIdNumber(
  elevenDigits: string,
): number[] {
  const possibleAge = possibleAgeOfPersonWithIdNumber(elevenDigits);
  return possibleAge == null ? [] : [possibleAge];
}

/**
 * Returns the age of a person with given Norwegian national identity number.
 * Returns `undefined` when birth date could not be determined (e.g. for FH-numbers and invalid ID-numbers).
 */
export function possibleAgeOfPersonWithIdNumber(
  elevenDigits: string,
): number | undefined {
  const birthDate = possibleBirthDateOfIdNumber(elevenDigits);
  if (birthDate == null) {
    return undefined;
  }

  const years = diffYears(new Date(), birthDate);
  return years >= 0 && years < 125 ? years : undefined;
}

export function idNumberContainsBirthDate(elevenDigits: string): boolean {
  return idNumberType(elevenDigits) !== 'FHNumber';
}

function possibleBirthDateOfIdNumber(elevenDigits: string): Date | undefined {
  if (elevenDigits.length !== 11) return undefined;
  const type = idNumberType(elevenDigits);
  switch (type) {
    case 'birthNumber':
      return possibleBirthDateOfBirthNumber(elevenDigits);
    case 'DNumber':
      return possibleBirthDateOfDNumber(elevenDigits);
    case 'HNumber':
      return possibleBirthDateOfHNumber(elevenDigits);
  }
  return undefined;
}

function idNumberType(elevenDigits: string): IDNumberType {
  const firstDigit = parseInt(elevenDigits[0]);
  if (firstDigit === 8 || firstDigit === 9) return 'FHNumber';
  if (firstDigit >= 4 && firstDigit <= 7) return 'DNumber';
  const thirdDigit = parseInt(elevenDigits[2]);
  if (thirdDigit === 4 || thirdDigit === 5) return 'HNumber';
  else return 'birthNumber';
}

function possibleBirthDateOfBirthNumber(
  elevenDigits: string,
): Date | undefined {
  return getBirthDate(elevenDigits);
}

function possibleBirthDateOfHNumber(elevenDigits: string): Date | undefined {
  const correctedThirdDigit = (parseInt(elevenDigits[2]) - 4).toString();
  return getBirthDate(
    elevenDigits.slice(0, 2) + correctedThirdDigit + elevenDigits.slice(3, 11),
  );
}

function possibleBirthDateOfDNumber(elevenDigits: string): Date | undefined {
  const correctedFirstDigit = (parseInt(elevenDigits[0]) - 4).toString();
  return getBirthDate(correctedFirstDigit + elevenDigits.slice(1, 11));
}

function getBirthDate(elevenDigitsWithDDMMYY: string): Date | undefined {
  const DD = elevenDigitsWithDDMMYY.slice(0, 2);
  const MM = elevenDigitsWithDDMMYY.slice(2, 4);
  const YY = elevenDigitsWithDDMMYY.slice(4, 6);
  const YY_int = parseInt(YY);
  const ageGroupNumber = parseInt(elevenDigitsWithDDMMYY.slice(6, 9));

  let centuryPrefix = '20';
  if (ageGroupNumber >= 0 && ageGroupNumber < 500) {
    centuryPrefix = '19';
  } else if (ageGroupNumber >= 500 && ageGroupNumber < 750 && YY_int >= 54) {
    centuryPrefix = '18';
  } else if (ageGroupNumber >= 900 && ageGroupNumber < 1000 && YY_int >= 40) {
    centuryPrefix = '19';
  }

  const fullYear = `${centuryPrefix}${YY}`;
  const isoStr = [fullYear, MM, DD].join('-') + 'T00:00:00';
  const birthDate = new Date(isoStr);

  if (!isValidDate(birthDate, fullYear, MM, DD)) {
    return undefined;
  }

  return birthDate;
}

function isValidCheckDigits(elevenDigits: string): boolean {
  const staticSequenceFirstCheckDigit = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
  const staticSequenceSecondCheckDigit = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

  const elevenDigitsArray = elevenDigits.split('').map(Number);

  return (
    isValidCheckDigit(staticSequenceFirstCheckDigit, elevenDigitsArray) &&
    isValidCheckDigit(staticSequenceSecondCheckDigit, elevenDigitsArray)
  );
}

function isValidCheckDigit(
  staticSequence: number[],
  elevenDigits: number[],
): boolean {
  const productSum = staticSequence.reduce(
    (acc, value, index) => acc + value * elevenDigits[index],
    0,
  );

  return productSum % 11 === 0;
}
