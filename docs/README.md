[norwegian-national-id-validator](README.md)

# norwegian-national-id-validator

## Index

### Enumerations

* [Gender](enums/gender.md)
* [IDNumberType](enums/idnumbertype.md)

### Functions

* [NorwegianId](README.md#const-norwegianid)
* [diffYears](README.md#private-diffyears)
* [getBirthDate](README.md#private-getbirthdate)
* [getGender](README.md#getgender)
* [idNumberContainsBirthDate](README.md#idnumbercontainsbirthdate)
* [idNumberType](README.md#idnumbertype)
* [isValidCheckDigit](README.md#private-isvalidcheckdigit)
* [isValidCheckDigits](README.md#private-isvalidcheckdigits)
* [isValidDate](README.md#isvaliddate)
* [possibleAgeOfPersonWithIdNumber](README.md#possibleageofpersonwithidnumber)
* [possibleAgesOfPersonWithIdNumber](README.md#possibleagesofpersonwithidnumber)
* [possibleBirthDateOfBirthNumber](README.md#possiblebirthdateofbirthnumber)
* [possibleBirthDateOfDNumber](README.md#possiblebirthdateofdnumber)
* [possibleBirthDateOfHNumber](README.md#possiblebirthdateofhnumber)
* [possibleBirthDateOfIdNumber](README.md#possiblebirthdateofidnumber)
* [validateNorwegianIdNumber](README.md#validatenorwegianidnumber)

## Functions

### `Const` NorwegianId

▸ **NorwegianId**(`idNumber`: string): *object*

Object-oriented API for Norwegian National ID Validator

**`example`** 
```javascript
import { NorwegianId } from 'norwegian-national-id-validator';

const valid = NorwegianId('0000000000');
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idNumber` | string | norwegian social security number  |

**Returns:** *object*

* **idNumber**: *string*

* **age**(): *undefined | number*

* **isBirthNumber**(): *boolean*

* **isDNumber**(): *boolean*

* **isFemale**(): *boolean*

* **isFhNumber**(): *boolean*

* **isHNumber**(): *boolean*

* **isMale**(): *boolean*

* **isValid**(): *boolean*

___

### `Private` diffYears

▸ **diffYears**(`startDate`: Date, `endDate`: Date): *number*

Calculated the difference betweeen two dates.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`startDate` | Date | Date instance |
`endDate` | Date | Date instance |

**Returns:** *number*

___

### `Private` getBirthDate

▸ **getBirthDate**(`elevenDigitsWithDDMMYY`: string): *Date | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`elevenDigitsWithDDMMYY` | string |

**Returns:** *Date | undefined*

___

###  getGender

▸ **getGender**(`elevenDigits`: string): *[Gender](enums/gender.md) | undefined*

Returns the gender based of id number

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | id number  |

**Returns:** *[Gender](enums/gender.md) | undefined*

___

###  idNumberContainsBirthDate

▸ **idNumberContainsBirthDate**(`elevenDigits`: string): *boolean*

Check if idNumber contains birth date

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | idNumber  |

**Returns:** *boolean*

___

###  idNumberType

▸ **idNumberType**(`elevenDigits`: string): *[IDNumberType](enums/idnumbertype.md)*

Get the ID number kind/type. This function does not validate, so
it should be combined with [`validateNorwegianIdNumber`](README.md#validatenorwegianidnumber).

**`example`**
```javascript
import { idNumberType, validateNorwegianIdNumber } from 'norwegian-national-id-validator';
if (validateNorwegianIdNumber(0000000000)) {
  const type = idNumberType(00000000000);
}
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | IdNumber  |

**Returns:** *[IDNumberType](enums/idnumbertype.md)*

___

### `Private` isValidCheckDigit

▸ **isValidCheckDigit**(`staticSequence`: number[], `elevenDigits`: number[]): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`staticSequence` | number[] |
`elevenDigits` | number[] |

**Returns:** *boolean*

___

### `Private` isValidCheckDigits

▸ **isValidCheckDigits**(`elevenDigits`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`elevenDigits` | string |

**Returns:** *boolean*

___

###  isValidDate

▸ **isValidDate**(`date`: Date, `expectedYear`: string, `expectedMonth`: string, `expectedDay`: string): *boolean*

Checks if a date is valid against another

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`date` | Date | Date instance |
`expectedYear` | string | - |
`expectedMonth` | string | - |
`expectedDay` | string |   |

**Returns:** *boolean*

___

###  possibleAgeOfPersonWithIdNumber

▸ **possibleAgeOfPersonWithIdNumber**(`elevenDigits`: string): *number | undefined*

Returns the age of a person with given Norwegian national identity number.
Returns `undefined` when birth date could not be determined (e.g. for FH-numbers and invalid ID-numbers).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | Identification number  |

**Returns:** *number | undefined*

___

###  possibleAgesOfPersonWithIdNumber

▸ **possibleAgesOfPersonWithIdNumber**(`elevenDigits`: string): *number[]*

Find possible age of person based of IDNumber

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | Identification number  |

**Returns:** *number[]*

___

###  possibleBirthDateOfBirthNumber

▸ **possibleBirthDateOfBirthNumber**(`elevenDigits`: string): *Date | undefined*

Get possible birth date from BirthNumber

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | BirthNumber  |

**Returns:** *Date | undefined*

___

###  possibleBirthDateOfDNumber

▸ **possibleBirthDateOfDNumber**(`elevenDigits`: string): *Date | undefined*

Get possible birth date from DNumber

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | DNumber  |

**Returns:** *Date | undefined*

___

###  possibleBirthDateOfHNumber

▸ **possibleBirthDateOfHNumber**(`elevenDigits`: string): *Date | undefined*

Get possible birth date from HNumber

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | HNumber  |

**Returns:** *Date | undefined*

___

###  possibleBirthDateOfIdNumber

▸ **possibleBirthDateOfIdNumber**(`elevenDigits`: string): *Date | undefined*

Get possible birth date from IdNumber

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`elevenDigits` | string | IdNumber  |

**Returns:** *Date | undefined*

___

###  validateNorwegianIdNumber

▸ **validateNorwegianIdNumber**(`idNumber`: string): *boolean*

Checks if the given value is a valid Norwegian national identity number.

**`example`** 
```javascript
import { validateNorwegianIdNumber } from 'norwegian-national-id-validator';
const valid = validateNorwegianIdNumber(0000000000);
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idNumber` | string | social security number |

**Returns:** *boolean*

`true` for valid, and `false` for invalid ID-number.
