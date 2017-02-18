# norwegian-national-id-validator

![Travis build status](https://travis-ci.org/mikaello/norwegian-national-id-validator.svg?branch=master)
[![npm](https://img.shields.io/npm/v/norwegian-national-id-validator.svg?style=flat-square)](https://www.npmjs.com/package/norwegian-national-id-validator)

Validate Norwegian national identity numbers ([birth number](https://en.wikipedia.org/wiki/National_identification_number#Norway) ([fødselsnummer](https://no.wikipedia.org/wiki/F%C3%B8dselsnummer)), D-number, H-number and FH-number).

## Installation

Install the package via `npm`:
```
npm install norwegian-national-id-validator --save
```


## Usage

### `validateNorwegianIdNumber(value)`
This method validates if the given value is a valid Norwegian national identity number. NOTE: Validation of check digits (the two last digits in an ID-number) is not yet implemented, see #1.

### `possibleAgesOfPersonWithIdNumber(value)`
This method returns a list with all the possible ages that a person with an ID equal to the given value can have.

## Example

```js
import { possibleAgesOfPersonWithIdNumber, validateNorwegianIdNumber } from 'norwegian-national-id-validator'

validateNorwegianIdNumber('29029900157')
// => false

validateNorwegianIdNumber('29029600013')
// => true

possibleAgesOfPersonWithIdNumber('03111590925')
// => [101, 1]

possibleAgesOfPersonWithIdNumber('03110175225')
// => [15]
```

## Tests

To run the tests for this module:

```
npm test
```


## License

[MIT](LICENSE)
