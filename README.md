# norwegian-national-id-validator

[![Travis build status](https://travis-ci.org/mikaello/norwegian-national-id-validator.svg?branch=master)](https://travis-ci.org/mikaello/norwegian-national-id-validator)
[![npm](https://img.shields.io/npm/v/norwegian-national-id-validator.svg?style=flat-square)](https://www.npmjs.com/package/norwegian-national-id-validator)

Validate Norwegian national identity numbers ([birth number](https://en.wikipedia.org/wiki/National_identification_number#Norway) ([fødselsnummer](https://no.wikipedia.org/wiki/F%C3%B8dselsnummer)), D-number, H-number and FH-number) with Javascript or ReasonML.

## Installation

```
yarn add norwegian-national-id-validator
```

Bucklescript users must also add this to `bsconfig.json`:

```diff
"bs-dependencies": [
+  "norwegian-national-id-validator"
]
```

## Usage

### `validateNorwegianIdNumber(value: string): bool`

This function validates if the given value is a valid Norwegian national identity number.

### `possibleAgeOfPersonWithIdNumber(value: string): int | undefined`

This functions returns a list with all the possible ages that a person with an ID equal to the given value can have.

Returns `undefined` when birth date could not be determined (e.g. for _FH-numbers_ and invalid ID-numbers).

## Example

### Javascript:

```js
import {
  possibleAgeOfPersonWithIdNumber,
  validateNorwegianIdNumber,
} from 'norwegian-national-id-validator';

validateNorwegianIdNumber('29029900157'); // => false
validateNorwegianIdNumber('29029600013'); // => true

possibleAgeOfPersonWithIdNumber('03111590925'); // => 1
possibleAgeOfPersonWithIdNumber('03110175225'); // => 15
possibleAgeOfPersonWithIdNumber('rubbish') === undefined; // => true
```

### Bucklescript / ReasonML:

```reason
open NorwegianNationalIdValidator;

validateNorwegianIdNumber("29029900157") |> Js.log; // => false
validateNorwegianIdNumber("29029600013") |> Js.log; // => true

possibleAgeOfPersonWithIdNumber("03111590925") |> Js.log; // => 1
possibleAgeOfPersonWithIdNumber("03110175225") |> Js.log; // => 15
(possibleAgeOfPersonWithIdNumber("rubbish") === None) |> Js.log; // => true
```

## Id number resources

https://www.miles.no/blogg/tema/teknisk/validering-av-norske-data

## Contribute

If you find bugs or have suggestions for enhancements, feel free to open an issue or PR. This project is written in ReasonML, so it is the `*.re` files that should be edited. Start compiling with `yarn start` and run tests with `yarn test`.
