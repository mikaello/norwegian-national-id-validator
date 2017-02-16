/ *
 * @flow
 *
 */

import moment from 'moment'

type IDNumberType = 'birthNumber' | 'DNumber' | 'HNumber' | 'FHNumber'

export function validateNorwegianIdNumber(idNumber: string): boolean {
  const trimmed = idNumber.trim()
  if (isNaN(trimmed)) return false
  if (trimmed.length !== 11) return false
  const type = idNumberType(trimmed)
  if (type === 'FHNumber') return true
  else return possibleAgesOfPersonWithIdNumber(trimmed).length > 0
}

export function possibleAgesOfPersonWithIdNumber(elevenDigits: string): number[] {
  return possibleBirthDatesOfIdNumber(elevenDigits)
    .map(birthDate => moment().diff(birthDate, 'years'))
    .filter(age => age >= 0 && age < 125)
}

export function idNumberContainsBirthDate(elevenDigits: string): boolean {
  return idNumberType(elevenDigits) !== 'FHNumber'
}

function possibleBirthDatesOfIdNumber(elevenDigits: string): moment {
  if (elevenDigits.length !== 11) return []
  const type = idNumberType(elevenDigits)
  switch (type) {
    case 'birthNumber': return possibleBirthDateOfBirthNumber(elevenDigits)
    case 'DNumber': return possibleBirthDateOfDNumber(elevenDigits)
    case 'HNumber': return possibleBirthDateOfHNumber(elevenDigits)
  }
  return []
}

function idNumberType(elevenDigits: string): IDNumberType {
  const firstDigit = parseInt(elevenDigits[0])
  if (firstDigit === 8 || firstDigit === 9) return 'FHNumber'
  if (firstDigit >= 4 && firstDigit <= 7) return 'DNumber'
  const thirdDigit = parseInt(elevenDigits[2])
  if (thirdDigit === 4 || thirdDigit === 5) return 'HNumber'
  else return 'birthNumber'
}

function possibleBirthDateOfBirthNumber(elevenDigits: string): moment[] {
  return date(elevenDigits)
}

function possibleBirthDateOfHNumber(elevenDigits: string): moment[] {
  const correctedThirdDigit = (parseInt(elevenDigits[2]) - 4).toString()
  return date(elevenDigits.slice(0, 2) + correctedThirdDigit + elevenDigits.slice(3,11))
}

function possibleBirthDateOfDNumber(elevenDigits: string): moment[] {
  const correctedFirstDigit = (parseInt(elevenDigits[0]) - 4).toString()
  return date(correctedFirstDigit + elevenDigits.slice(1, 11))
}

function date(elevenDigitsWithDDMMYY: string): moment[] {
  const DDMM = elevenDigitsWithDDMMYY.slice(0,4)
  const YY = elevenDigitsWithDDMMYY.slice(4,6)
  const ageGroupNumber = parseInt(elevenDigitsWithDDMMYY.slice(6,9))
  let centuryPrefixes = ['19']
  if (ageGroupNumber >= 500 && ageGroupNumber < 1000) {
    centuryPrefixes = ['20']
  }
  if (ageGroupNumber >= 500 && ageGroupNumber < 750) {
    centuryPrefixes = ['20', '18']
  }
  if (ageGroupNumber >= 900 && ageGroupNumber < 1000) {
    centuryPrefixes = ['19', '20']
  }
  const possibleDates = centuryPrefixes
    .map(century => {
      return moment(DDMM + century + YY, 'DDMMYYYY', true)
    })
    .filter(date => date.isValid())
  return possibleDates
}
