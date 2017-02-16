# norwegian-national-id-validator

Validate Norwegian national identity numbers (birth number, D-number, H-number and FH-number).

## Installation

Install the package via `npm`:
```
npm install
```


## Usage

### `validateNorwegianIdNumber(value)`
This method validates if the given value is a valid Norwegian national identity number.

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
