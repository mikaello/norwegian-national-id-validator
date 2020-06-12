import { NorwegianId } from '../src/index';

const validation = NorwegianId('29029600013');

console.log({
    'isValid': validation.isValid(),
    'isBirthNumber': validation.isBirthNumber(),
    'isDNumber': validation.isDNumber(),
    'isHNumber': validation.isHNumber(),
    'isFhNumber': validation.isFhNumber(),
    'isMale': validation.isMale(),
    'isFemale': validation.isFemale(),
    'age': validation.age(),
});