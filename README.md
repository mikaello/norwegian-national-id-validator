# norwegian-national-id-validator

[![Travis build status](https://travis-ci.org/mikaello/norwegian-national-id-validator.svg?branch=master)](https://travis-ci.org/mikaello/norwegian-national-id-validator)
[![npm](https://img.shields.io/npm/v/norwegian-national-id-validator.svg?style=flat-square)](https://www.npmjs.com/package/norwegian-national-id-validator)

Validate Norwegian national identity numbers ([birth number](https://en.wikipedia.org/wiki/National_identification_number#Norway) ([fødselsnummer](https://no.wikipedia.org/wiki/F%C3%B8dselsnummer)), D-number, H-number and FH-number).

The NPM module is ES5, but TypeScript and Flow types is also exported. Types for Flow is generated with [Flowgen](https://github.com/joarwilk/flowgen).

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

### validateNorwegianIdNumber(value)
This function checks if the given value is a valid Norwegian national identity number. Returns `true` for valid, and `false` for invalid ID-number.

**Examples**

```js
import { validateNorwegianIdNumber } from 'norwegian-national-id-validator'

validateNorwegianIdNumber('29029900157')
// => false

validateNorwegianIdNumber('29029600013')
// => true
```

### possibleAgeOfPersonWithIdNumber(value)
This function returns the age of a person with given Norwegian national identity number.

Returns `undefined` when birth date could not be determined (e.g. for _FH-numbers_ and invalid ID-numbers).

**Examples**

```js

import { possibleAgeOfPersonWithIdNumber } from 'norwegian-national-id-validator'

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
