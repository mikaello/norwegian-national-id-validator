norwegian-national-id-validator

# norwegian-national-id-validator

## Table of contents

### Enumerations

- [Gender](enums/Gender.md)
- [IDNumberType](enums/IDNumberType.md)

### Functions

- [NorwegianId](README.md#norwegianid)
- [diffYears](README.md#diffyears)
- [getGender](README.md#getgender)
- [idNumberContainsBirthDate](README.md#idnumbercontainsbirthdate)
- [isValidCheckDigits](README.md#isvalidcheckdigits)
- [isValidDate](README.md#isvaliddate)
- [possibleAgeOfPersonWithIdNumber](README.md#possibleageofpersonwithidnumber)
- [possibleAgesOfPersonWithIdNumber](README.md#possibleagesofpersonwithidnumber)
- [validateNorwegianIdNumber](README.md#validatenorwegianidnumber)
- [possibleBirthDateOfIdNumber](README.md#possibleBirthDateOfIdNumber)

## Functions

### NorwegianId

▸ `Const` **NorwegianId**(`idNumber`): `Object`

Object-oriented API for Norwegian National ID Validator

**`example`**
```javascript
import { NorwegianId } from 'norwegian-national-id-validator';

const valid = NorwegianId('0000000000');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idNumber` | `string` | norwegian social security number |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `age` | () => `number` \| `undefined` |
| `idNumber` | `string` |
| `isBirthNumber` | () => `boolean` |
| `isDNumber` | () => `boolean` |
| `isFemale` | () => `boolean` |
| `isFhNumber` | () => `boolean` |
| `isHNumber` | () => `boolean` |
| `isMale` | () => `boolean` |
| `isValid` | () => `boolean` |
| `birthDate` | () => `Date` \| `undefined` |

___

### diffYears

▸ `Private` **diffYears**(`startDate`, `endDate`): `number`

Calculated the difference betweeen two dates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startDate` | `Date` | Date instance |
| `endDate` | `Date` | Date instance |

#### Returns

`number`

___

### getGender

▸ **getGender**(`elevenDigits`): [`Gender`](enums/Gender.md) \| `undefined`

Returns the gender based of ID number. Returns `undefined` when no gender
information is available.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elevenDigits` | `string` | ID number |

#### Returns

[`Gender`](enums/Gender.md) \| `undefined`

___

### idNumberContainsBirthDate

▸ **idNumberContainsBirthDate**(`elevenDigits`): `boolean`

Check if idNumber contains birth date

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elevenDigits` | `string` | idNumber |

#### Returns

`boolean`

___

### isValidCheckDigits

▸ `Private` **isValidCheckDigits**(`elevenDigits`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `elevenDigits` | `string` |

#### Returns

`boolean`

___

### isValidDate

▸ **isValidDate**(`date`, `expectedYear`, `expectedMonth`, `expectedDay`): `boolean`

Checks if a date is valid against another

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `date` | `Date` | Date instance |
| `expectedYear` | `string` |  |
| `expectedMonth` | `string` |  |
| `expectedDay` | `string` |  |

#### Returns

`boolean`

___

### possibleAgeOfPersonWithIdNumber

▸ **possibleAgeOfPersonWithIdNumber**(`elevenDigits`): `number` \| `undefined`

Returns the age of a person with given Norwegian national identity number.
Returns `undefined` when birth date could not be determined (e.g. for FH-numbers and invalid ID-numbers).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elevenDigits` | `string` | Identification number |

#### Returns

`number` \| `undefined`

___

### possibleAgesOfPersonWithIdNumber

▸ **possibleAgesOfPersonWithIdNumber**(`elevenDigits`): `number`[]

Find possible age of person based of ID number

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elevenDigits` | `string` | Identification number |

#### Returns

`number`[]

___

### validateNorwegianIdNumber

▸ **validateNorwegianIdNumber**(`idNumber`): `boolean`

Checks if the given value is a valid Norwegian national identity number.

**`example`**
```javascript
import { validateNorwegianIdNumber } from 'norwegian-national-id-validator';
const valid = validateNorwegianIdNumber(0000000000);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idNumber` | `string` | social security number |

#### Returns

`boolean`

`true` for valid, and `false` for invalid ID number.

___

### possibleBirthDateOfIdNumber

▸ **possibleBirthDateOfIdNumber**(`elevenDigits`): `Date` \| `undefined`

Returns the birth date of a person with the given Norwegian national identity number as Date object. Returns `undefined` when birth date could not be determined (e.g. for FH-numbers and invalid ID-numbers).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elevenDigits` | `string` | Identification number |

#### Returns

`Date` \| `undefined`