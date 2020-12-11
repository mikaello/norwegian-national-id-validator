import { set as setDate, reset as resetDate } from 'mockdate';
import { register, unregister } from 'timezone-mock';

import { validNumbers } from './listOfPersonalIdNumbers';
import {
  possibleAgeOfPersonWithIdNumber,
  validateNorwegianIdNumber,
  diffYears,
  isValidDate,
  getGender,
  Gender,
  NorwegianId,
  isValidCheckDigits,
} from '../src/index';

describe('Norwegian ID number validation', () => {
  it('works for valid birth numbers for men born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].men) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy();
    }
  });

  it('works for valid birth numbers for women born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].women) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy();
    }
  });

  it('knows that no one could possibly be born on 29. Feb 1999', () => {
    expect(validateNorwegianIdNumber('29029900157')).toBeFalsy();
  });

  it('knows that it is possible to be born on 29. Feb 1996', () => {
    expect(validateNorwegianIdNumber('29029600013')).toBeTruthy();
  });

  it('does not accept future valid ID numbers', () => {
    expect(validateNorwegianIdNumber('24088951559')).toBeFalsy();
  });

  it('does not accept ID numbers with invalid check digits', () => {
    expect(validateNorwegianIdNumber('81234567803')).toBeFalsy();
    expect(validateNorwegianIdNumber('01415612381')).toBeFalsy();
    expect(validateNorwegianIdNumber('03119975255')).toBeFalsy();
    expect(validateNorwegianIdNumber('67047000658')).toBeFalsy();
  });

  it('works with D numbers', () => {
    for (const number of validNumbers.DNumbers) {
      expect(NorwegianId(number).isDNumber()).toBeTruthy();
    }
  });

  it('does not accept D numbers from future', () => {
    // born in 2063
    expect(isValidCheckDigits('71106177273')).toBeTruthy();
    expect(NorwegianId('71106177273').isDNumber()).toBeFalsy();

    // born in 2097
    expect(isValidCheckDigits('71019762194')).toBeTruthy();
    expect(NorwegianId('71019762194').isDNumber()).toBeFalsy();

    // born in 2097
    expect(isValidCheckDigits('71019799918')).toBeTruthy();
    expect(NorwegianId('71019799918').isDNumber()).toBeFalsy();
  });

  it('does not accept non D numbers when checking for D number', () => {
    expect(NorwegianId('03111590981').isValid()).toBeTruthy();
    expect(NorwegianId('03111590981').isDNumber()).toBeFalsy();

    expect(NorwegianId('03115690905').isValid()).toBeTruthy();
    expect(NorwegianId('03115690905').isDNumber()).toBeFalsy();
  });

  it('works with FH numbers', () => {
    expect(validateNorwegianIdNumber('81234567802')).toBeTruthy();
    expect(validateNorwegianIdNumber('91234567883')).toBeTruthy();
  });

  it('works with H numbers', () => {
    expect(validateNorwegianIdNumber('01415612385')).toBeTruthy();

    expect(isValidCheckDigits('01535612303')).toBeTruthy();
    expect(validateNorwegianIdNumber('01535612303')).toBeFalsy();
  });

  it('works with birth numbers from the Norsk Helsenett Testaktoerer', () => {
    for (const number of validNumbers.NorskHelsenettTestaktoerer) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy();
    }

    // Testpasient 6 - D-number is invalid
    expect(validateNorwegianIdNumber('70019950032')).toBeFalsy();
  });
});

describe('A Norwegian person number (last 5 digits of ID number)', () => {
  beforeEach(() => {
    setDate('06/18/2017');
  });
  afterEach(() => {
    resetDate();
  });

  it('D numbers belongs to persons in the 2000s if the individual numbers are in the [500, 1000) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('71010073132')).toBe(17);
    expect(possibleAgeOfPersonWithIdNumber('50101099943')).toBe(6);
  });

  it('belongs to a person born in the 1900s if the three first digits are in the [0, 500) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('03119849925')).toBe(18);
  });

  it('belongs to a person born in the 1800s or 2000s if the three first digits are in the [500, 750) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('04119850938')).toBe(118);
    expect(possibleAgeOfPersonWithIdNumber('04110250989')).toBe(14);
  });

  it('belongs to a person born in the 1900s or 2000s if the three first digits are in the [900, 1000) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('03111590981')).toBe(1);
    expect(possibleAgeOfPersonWithIdNumber('03115690905')).toBe(60);
  });

  it('belongs to a person born in the 2000s if the three first digits are in the [750, 900) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('03110175255')).toBe(15);
    expect(possibleAgeOfPersonWithIdNumber('03119975246')).toBeUndefined();
  });

  it('is not part of an FH number', () => {
    expect(possibleAgeOfPersonWithIdNumber('83119849925')).toBeUndefined();
  });

  it('cannot be meaningfully extracted from an ID number shorter than 11 digits', () => {
    for (const length in [...Array(11).keys()]) {
      expect(
        possibleAgeOfPersonWithIdNumber('1'.repeat(Number(length))),
      ).toBeUndefined();
    }
  });

  it('is male if third digit in the person number is odd', () => {
    expect(getGender('03119849925')).toEqual(Gender.Male);
  });
});

describe('helper functions', () => {
  test('diffYears() returns 0 when no diff', () => {
    expect(diffYears(new Date(), new Date())).toBe(0);
  });

  test('diffYears() returns correct diff for same dates two year apart', () => {
    expect(diffYears(new Date('1995-12-17'), new Date('1993-12-17'))).toBe(2);
  });

  test('diffYears() returns negative number when first argument is later in time', () => {
    expect(diffYears(new Date('1993-12-17'), new Date('1995-12-17'))).toBe(-2);
  });

  test('diffYears() returns one year diff when it only is one and a half year difference', () => {
    expect(diffYears(new Date('1995-01-01'), new Date('1993-06-01'))).toBe(1);
  });

  test('isValiddate() returns valid for valid dates', () => {
    expect(
      isValidDate(new Date('1995-01-20'), '1995', '01', '20'),
    ).toBeTruthy();
    expect(
      isValidDate(new Date('2020-02-29'), '2020', '02', '29'),
    ).toBeTruthy();
  });

  test('isValiddate() returns invalid for leap date not in leap year', () => {
    expect(isValidDate(new Date('2019-02-29'), '2019', '02', '29')).toBeFalsy();
  });

  test('isValiddate() returns invalid when expectations is not met', () => {
    expect(isValidDate(new Date('2019-01-15'), '2000', '01', '15')).toBeFalsy();
    expect(isValidDate(new Date('not good'), '2000', '01', '15')).toBeFalsy();
  });
});

describe('does not care about current users timezone', () => {
  beforeEach(() => {
    register('US/Pacific');
  });
  afterEach(() => {
    unregister();
  });
  test('isValidDate() and ISO date has no timestamp can be falsy', () => {
    expect(isValidDate(new Date('1984-11-28'), '1984', '11', '28')).toBeFalsy();
  });
  test('isValidDate() and ISO date has timestamp is truthy', () => {
    expect(
      isValidDate(new Date('1984-11-28T00:00:00'), '1984', '11', '28'),
    ).toBeTruthy();
  });
  it('validateNorwegianIdNumber() works for valid birth numbers for men born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].men) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy();
    }
  });
  it('validateNorwegianIdNumber() works for valid birth numbers for women born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].women) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy();
    }
  });
});
