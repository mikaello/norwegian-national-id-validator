import MockDate from 'mockdate'

import { validNumbers } from './testdata/listOfPersonalIdNumbers'
import { possibleAgeOfPersonWithIdNumber, validateNorwegianIdNumber, isBirthNumber } from'../src/index'


describe('Norwegian ID number validation', () => {

  it('works for valid birth numbers for men born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].men) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy()
    }
  })

  it('works for valid birth numbers for women born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].women) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy()
    }
  })

  it('knows that no one could possibly be born on 29. Feb 1999', () => {
    expect(validateNorwegianIdNumber('29029900157')).toBeFalsy()
  })

  it('knows that it is possible to be born on 29. Feb 1996', () => {
    expect(validateNorwegianIdNumber('29029600013')).toBeTruthy()
  })

  it('does not accept future valid ID numbers', () => {
    expect(validateNorwegianIdNumber('24088951559')).toBeFalsy()
  })

  it('does not accept ID numbers with invalid check digits', () => {
    expect(validateNorwegianIdNumber('81234567803')).toBeFalsy()
    expect(validateNorwegianIdNumber('01415612381')).toBeFalsy()
    expect(validateNorwegianIdNumber('03119975255')).toBeFalsy()
    expect(validateNorwegianIdNumber('67047000658')).toBeFalsy()
  })

  it('works with D numbers', () => {
    for (const number of validNumbers.DNumbers) {
      expect(validateNorwegianIdNumber(number)).toBeTruthy()
    }
  })

  it('works with FH numbers', () => {
    expect(validateNorwegianIdNumber('81234567802')).toBeTruthy()
    expect(validateNorwegianIdNumber('91234567883')).toBeTruthy()
  })

  it('works with H numbers', () => {
    expect(validateNorwegianIdNumber('01415612385')).toBeTruthy()
    expect(validateNorwegianIdNumber('01535612303')).toBeFalsy()
  })
})

describe('A Norwegian person number (last 5 digits of ID number)', () => {
  beforeEach(() => { MockDate.set('06/18/2017')})
  afterEach(() => { MockDate.reset() })

  it('belongs to a person born in the 1900s if the three first digits are in the [0, 500) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('03119849925')).toBe(18)
  })

  it('belongs to a person born in the 1800s or 2000s if the three first digits are in the [500, 750) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('04119850938')).toBe(118)
    expect(possibleAgeOfPersonWithIdNumber('04110250989')).toBe(14)
  })

  it('belongs to a person born in the 1900s or 2000s if the three first digits are in the [900, 1000) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('03111590981')).toBe(1)
    expect(possibleAgeOfPersonWithIdNumber('03115690905')).toBe(60)
  })

  it('belongs to a person born in the 2000s if the three first digits are in the [750, 900) range', () => {
    expect(possibleAgeOfPersonWithIdNumber('03110175255')).toBe(15)
    expect(possibleAgeOfPersonWithIdNumber('03119975246')).toBeUndefined()
  })

  it('is not part of an FH number', () => {
    expect(possibleAgeOfPersonWithIdNumber('83119849925')).toBeUndefined()
  })

  it('cannot be meaningfully extracted from an ID number shorter than 11 digits', () => {
    for (const length in [...Array(11).keys()]) {
      expect(possibleAgeOfPersonWithIdNumber('1'.repeat(length))).toBeUndefined()
    }
  })


  it('works', () => {
	  //	validateNorwegianIdNumber('03111590981').should.be.true()
	  expect(isBirthNumber('03111590981')).toBeTruthy()
  })
})
