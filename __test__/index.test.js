import should from 'should'

import { validNumbers } from './listOfPersonalIdNumbers'
import { possibleAgesOfPersonWithIdNumber, validateNorwegianIdNumber } from'../src/index'


describe('Norwegian ID number validation', () => {

  it('works for valid birth numbers for men born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].men) {
      validateNorwegianIdNumber(number).should.be.true()
    }
  })

  it('works for valid birth numbers for women born on 1. Jan 1901', () => {
    for (const number of validNumbers['01-01-1901'].women) {
      validateNorwegianIdNumber(number).should.be.true()
    }
  })

  it('knows that no one could possibly be born on 29. Feb 1999', () => {
    validateNorwegianIdNumber('29029900157').should.be.false()
  })

  it('knows that it is possible to be born on 29. Feb 1996', () => {
    validateNorwegianIdNumber('29029600013').should.be.true()
  })

  it('does not accept future valid ID numbers', () => {
    validateNorwegianIdNumber('24088951559').should.be.false()
  })

  it('works with D numbers', () => {
    for (const number of validNumbers.DNumbers) {
      validateNorwegianIdNumber(number).should.be.true()
    }
  })

  it('works with FH numbers', () => {
    // if we implement checksum validation these might fail
    validateNorwegianIdNumber('81234567890').should.be.true()
    validateNorwegianIdNumber('91234567890').should.be.true()
  })

  it('works with H numbers', () => {
    // if we implement checksum validation these might fail
    validateNorwegianIdNumber('01415612345').should.be.true()
    validateNorwegianIdNumber('01535612345').should.be.false()
  })
})

describe('A Norwegian person number (last 5 digits of ID number)', () => {

  it('belongs to a person born in the 1900s if the three first digits are in the [0, 500) range', () => {
    possibleAgesOfPersonWithIdNumber('03119849925').should.deepEqual([18])
  })

  it('belongs to a person born in the 1800s or 2000s if the three first digits are in the [500, 750) range', () => {
    // if we implement checksum validation these might fail
    possibleAgesOfPersonWithIdNumber('03119850925').should.deepEqual([118])
    possibleAgesOfPersonWithIdNumber('03110250925').should.deepEqual([14])
  })

  it('belongs to a person born in the 1900s or 2000s if the three first digits are in the [900, 1000) range', () => {
    // if we implement checksum validation these might fail
    possibleAgesOfPersonWithIdNumber('03111590925').should.deepEqual([101, 1])
    possibleAgesOfPersonWithIdNumber('03115690925').should.deepEqual([60])
  })

  it('belongs to a person born in the 2000s if the three first digits are in the [750, 900) range', () => {
    // if we implement checksum validation these might fail
    possibleAgesOfPersonWithIdNumber('03110175225').should.deepEqual([15])
    possibleAgesOfPersonWithIdNumber('03119975225').should.deepEqual([])
  })

  it('is not part of an FH number', () => {
    possibleAgesOfPersonWithIdNumber('83119849925').should.be.empty()
  })

  it('cannot be meaningfully extracted from an ID number shorter than 11 digits', () => {
    for (const length in [...Array(11).keys()]) {
      possibleAgesOfPersonWithIdNumber('1'.repeat(length)).should.be.empty()
    }
  })
})
