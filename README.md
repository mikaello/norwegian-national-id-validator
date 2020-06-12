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

This package exports a functional and object-oriented API for your convenience.

### Object-oriented API

```js
import { NorwegianId } from 'norwegian-national-id-validator';

const validation = NorwegianId('29029600013');

if (validation.isValid())
// => true

if (validation.isBirthNumber())
// => true

if (validation.isDNumber())
// => false

if (validation.isHNumber())
// => false

if (validation.isFhNumber())
// => false

if (validation.isMale())
// => false

if (validation.isFemale())
// => true

if (validation.age())
// => 24
```

### Functional API

#### validateNorwegianIdNumber(value)

This function checks if the given value is a valid Norwegian national identity number. Returns `true` for valid, and `false` for invalid ID-number.

**Examples**

```js
import { validateNorwegianIdNumber } from 'norwegian-national-id-validator';

validateNorwegianIdNumber('29029900157');
// => false

validateNorwegianIdNumber('29029600013');
// => true
```

#### possibleAgeOfPersonWithIdNumber(value)

This function returns the age of a person with given Norwegian national identity number.

Returns `undefined` when birth date could not be determined (e.g. for _FH-numbers_ and invalid ID-numbers).

**Examples**

```js
import { possibleAgeOfPersonWithIdNumber } from 'norwegian-national-id-validator';

possibleAgeOfPersonWithIdNumber('03111590925');
// => 1

possibleAgeOfPersonWithIdNumber('03110175225');
// => 15
```

## Documentation

Apart from this README, you can find details and examples of using the SDK in the following places:  

- [SDK Documentation](docs/README.md)
- [Examples](examples/)

## Tests

To run the tests for this module:

```
npm test
```

## Other relevant projects

- [Censorbot by Vipps](https://github.com/vippsas/vipps-developers/tree/master/housekeeping/censorbot)<br />
  Censorbot looks for patterns in numbers containing 11 digits posted in Slack, using this package.

- [ng-input-validators](https://github.com/hansamaligamage/ng-input-validations/tree/master/input-validations)<br />
  Code samples for Angular.

- [cobraz/norwegian-ssn-graphql-scalar](https://github.com/cobraz/norwegian-ssn-graphql-scalar)<br />
  Custom GraphQL scalar type that utilizes this library.

## License

[MIT](LICENSE)
