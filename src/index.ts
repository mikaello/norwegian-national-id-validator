export type NorwegianIdObject = {
  /** The ID this object was created with */
  idNumber: string;

  isValid: () => boolean;

  /**
   * A national identity number (birth number) is an ID number for you who
   * have a residence permit and are going to live in Norway for more than
   * six months.
   */
  isBirthNumber: () => boolean;

  /**
   * A D number is a temporary identification number that you get if you have
   * applied for protection (asylum), or if you have a residence permit and
   * are going to stay in Norway for less than six months.
   */
  isDNumber: () => boolean;

  /**
   * A H number is a number used for assistance, a unique identification of a
   * person that does not have a national ID or a D number or in cases where
   * this is not known. A H number contains information about age and gender.
   */
  isHNumber: () => boolean;

  /**
   * A FH number is used in health care to uniquely identify patients that
   * does not have a known national ID or D number. A FH number does not have
   * any information about age or gender.
   */
  isFhNumber: () => boolean;

  isMale: () => boolean;

  isFemale: () => boolean;

  age: () => number | undefined;

  birthDate: () => Date | undefined;
};

/**
 * Object-oriented API for Norwegian National ID Validator
 * @example
 * ```javascript
 * import { NorwegianId } from 'norwegian-national-id-validator';
 *
 * const valid = NorwegianId('0000000000');
 * ```
 * @param idNumber norwegian social security number
 */
export const NorwegianId = (idNumber: string): NorwegianIdObject => {
  const valid = validateNorwegianIdNumber(idNumber);

  return {
    idNumber,
    isValid: () => valid,

    isBirthNumber: () =>
      valid && idNumberType(idNumber) == IDNumberType.BirthNumber,

    isDNumber: () => valid && idNumberType(idNumber) == IDNumberType.DNumber,

    isHNumber: () => valid && idNumberType(idNumber) == IDNumberType.HNumber,

    isFhNumber: () => valid && idNumberType(idNumber) == IDNumberType.FHNumber,
    isMale: () => valid && getGender(idNumber) == Gender.Male,
    isFemale: () => valid && getGender(idNumber) == Gender.Female,
    age: () => possibleAgeOfPersonWithIdNumber(idNumber),
    birthDate: () =>
      (valid && possibleBirthDateOfIdNumber(idNumber)) || undefined,
  };
};

/**
 * Calculated the difference betweeen two dates.
 * @param startDate Date instance
 * @param endDate Date instance
 * @private
 */
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

/**
 * Checks if a date is valid against another
 * @param date Date instance
 * @param expectedYear
 * @param expectedMonth
 * @param expectedDay
 */
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

/** In Norway there are several different ID numbers */
export enum IDNumberType {
  /**
   * A national identity number (birth number) is an ID number for you who
   * have a residence permit and are going to live in Norway for more than
   * six months.
   */
  BirthNumber,
  /**
   * A D number is a temporary identification number that you get if you have
   * applied for protection (asylum), or if you have a residence permit and
   * are going to stay in Norway for less than six months.
   */
  DNumber,
  /**
   * A H number is a number used for assistance, a unique identification of a
   * person that does not have a national ID or a D number or in cases where
   * this is not known. A H number contains information about age and gender.
   */
  HNumber,
  /**
   * A FH number is used in health care to uniquely identify patients that
   * does not have a known national ID or D number. A FH number does not have
   * any information about age or gender.
   */
  FHNumber,
}

/**
 * Birth numbers, D-number and H-number contains information about gender
 */
export enum Gender {
  /** If the third last digit in the ID number is odd, it is a male */
  Male,
  /** If the third last digit in the ID number is even, it is a female */
  Female,
}

/**
 * Checks if the given value is a valid Norwegian national identity number.
 * @example
 * ```javascript
 * import { validateNorwegianIdNumber } from 'norwegian-national-id-validator';
 * const valid = validateNorwegianIdNumber(0000000000);
 * ```
 * @param idNumber social security number
 * @returns `true` for valid, and `false` for invalid ID number.
 */
export function validateNorwegianIdNumber(idNumber: string): boolean {
  const trimmed = idNumber?.trim() ?? '';
  if (isNaN(Number(trimmed))) return false;
  if (trimmed.length !== 11) return false;
  if (!isValidCheckDigits(trimmed)) return false;
  const type = idNumberType(trimmed);
  if (type === IDNumberType.FHNumber) return true;
  else return possibleAgesOfPersonWithIdNumber(trimmed).length > 0;
}

/**
 * Find possible age of person based of ID number
 * @param elevenDigits Identification number
 */
export function possibleAgesOfPersonWithIdNumber(
  elevenDigits: string,
): number[] {
  const possibleAge = possibleAgeOfPersonWithIdNumber(elevenDigits);
  return possibleAge == null ? [] : [possibleAge];
}

/**
 * Returns the age of a person with given Norwegian national identity number.
 * Returns `undefined` when birth date could not be determined (e.g. for FH-numbers and invalid ID-numbers).
 * @param elevenDigits Identification number
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
/**
 * Check if idNumber contains birth date
 * @param elevenDigits idNumber
 */
export function idNumberContainsBirthDate(elevenDigits: string): boolean {
  return idNumberType(elevenDigits) !== IDNumberType.FHNumber;
}

/**
 * Get possible birth date from ID number
 * @param elevenDigits IdNumber
 */
export function possibleBirthDateOfIdNumber(
  elevenDigits: string,
): Date | undefined {
  if (elevenDigits?.length !== 11) return undefined;
  const type = idNumberType(elevenDigits);
  switch (type) {
    case IDNumberType.BirthNumber:
      return possibleBirthDateOfBirthNumber(elevenDigits);
    case IDNumberType.DNumber:
      return possibleBirthDateOfDNumber(elevenDigits);
    case IDNumberType.HNumber:
      return possibleBirthDateOfHNumber(elevenDigits);
  }
  return undefined;
}

/**
 * Get the ID number kind/type. This function does not validate, so
 * it should be combined with {@linkcode validateNorwegianIdNumber}.
 * @example
 * ```javascript
 * import { idNumberType, validateNorwegianIdNumber } from 'norwegian-national-id-validator';
 * if (validateNorwegianIdNumber(0000000000)) {
 *   const type = idNumberType(00000000000);
 * }
 * ```
 * @param elevenDigits IdNumber
 */
function idNumberType(elevenDigits: string): IDNumberType {
  const firstDigit = parseInt(elevenDigits[0]);
  if (firstDigit === 8 || firstDigit === 9) return IDNumberType.FHNumber;
  if (firstDigit >= 4 && firstDigit <= 7) return IDNumberType.DNumber;
  const thirdDigit = parseInt(elevenDigits[2]);
  if (thirdDigit === 4 || thirdDigit === 5) return IDNumberType.HNumber;
  else return IDNumberType.BirthNumber;
}

/**
 * Get possible birth date from BirthNumber
 * @param elevenDigits BirthNumber
 */
function possibleBirthDateOfBirthNumber(
  elevenDigits: string,
): Date | undefined {
  return getBirthDate(elevenDigits, IDNumberType.BirthNumber);
}

/**
 * Get possible birth date from HNumber
 * @param elevenDigits HNumber
 */
function possibleBirthDateOfHNumber(elevenDigits: string): Date | undefined {
  const correctedThirdDigit = (parseInt(elevenDigits[2]) - 4).toString();
  return getBirthDate(
    elevenDigits.slice(0, 2) + correctedThirdDigit + elevenDigits.slice(3, 11),
    IDNumberType.HNumber,
  );
}

/**
 * Get possible birth date from DNumber
 * @param elevenDigits DNumber
 */
function possibleBirthDateOfDNumber(elevenDigits: string): Date | undefined {
  const correctedFirstDigit = (parseInt(elevenDigits[0]) - 4).toString();
  return getBirthDate(
    correctedFirstDigit + elevenDigits.slice(1, 11),
    IDNumberType.DNumber,
  );
}

/**
 * @private
 */
function getBirthDate(
  elevenDigitsWithDDMMYY: string,
  idNumberType: IDNumberType,
): Date | undefined {
  const DD = elevenDigitsWithDDMMYY.slice(0, 2);
  const MM = elevenDigitsWithDDMMYY.slice(2, 4);
  const YY = elevenDigitsWithDDMMYY.slice(4, 6);
  const YY_int = parseInt(YY);
  const ageGroupNumber = parseInt(elevenDigitsWithDDMMYY.slice(6, 9));

  let centuryPrefix = '20';
  if (ageGroupNumber >= 0 && ageGroupNumber < 500) {
    centuryPrefix = '19';
  } else if (idNumberType === IDNumberType.DNumber) {
    centuryPrefix = '20';
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

/**
 * @private
 */
export function isValidCheckDigits(elevenDigits: string): boolean {
  const staticSequenceFirstCheckDigit = [3, 7, 6, 1, 8, 9, 4, 5, 2, 1];
  const staticSequenceSecondCheckDigit = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 1];

  const elevenDigitsArray = elevenDigits.split('').map(Number);

  return (
    isValidCheckDigit(staticSequenceFirstCheckDigit, elevenDigitsArray) &&
    isValidCheckDigit(staticSequenceSecondCheckDigit, elevenDigitsArray)
  );
}

/**
 * @private
 */
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

/**
 * Returns the gender based of ID number. Returns `undefined` when no gender
 * information is available.
 * @param elevenDigits ID number
 */
export function getGender(elevenDigits: string): Gender | undefined {
  if (elevenDigits?.length != 11) {
    return undefined;
  } else if (idNumberType(elevenDigits) == IDNumberType.FHNumber) {
    return undefined;
  }

  const isFemale = Number(elevenDigits.charAt(8)) % 2 == 0;

  if (isFemale) {
    return Gender.Female;
  } else {
    return Gender.Male;
  }
}
