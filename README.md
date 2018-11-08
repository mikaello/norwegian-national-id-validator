# norwegian-national-id-validator

![Travis build status](https://travis-ci.org/mikaello/norwegian-national-id-validator.svg?branch=master)
[![npm](https://img.shields.io/npm/v/norwegian-national-id-validator.svg?style=flat-square)](https://www.npmjs.com/package/norwegian-national-id-validator)

Validate Norwegian national identity numbers ([birth number](https://en.wikipedia.org/wiki/National_identification_number#Norway) ([fødselsnummer](https://no.wikipedia.org/wiki/F%C3%B8dselsnummer)), D-number, H-number and FH-number).

## Installation

Install the package via `npm`:
```
npm install --save norwegian-national-id-validator
```
or
```
yarn add norwegian-national-id-validator
```


## Usage

### `validateNorwegianIdNumber(value)`
This method validates if the given value is a valid Norwegian national identity number.

### `possibleAgeOfPersonWithIdNumber(value)`
This method returns a list with all the possible ages that a person with an ID equal to the given value can have. 

Returns `undefined` when birth date could not be determined (e.g. for _FH-numbers_ and invalid ID-numbers).

## Example

```js
import { possibleAgeOfPersonWithIdNumber, validateNorwegianIdNumber } from 'norwegian-national-id-validator'

validateNorwegianIdNumber('29029900157')
// => false

validateNorwegianIdNumber('29029600013')
// => true

possibleAgeOfPersonWithIdNumber('03111590925')
// => 1

possibleAgeOfPersonWithIdNumber('03110175225')
// => 15
```

## Tests

To run the tests for this module:

```
npm test
```


## License

[MIT](LICENSE)
