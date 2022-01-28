import { NorwegianId } from '../src/index';
import { set, reset } from 'mockdate';

describe('test of object oriented API for ID number validation', () => {
  beforeEach(() => {
    set('06/18/2017');
  });
  
  afterEach(() => {
    reset();
  });

  test('that functions in created object returns correct', () => {
    const id = NorwegianId('01010101782');

    expect(id.isValid()).toBeTruthy();
    expect(id.age()).toBe(116);
    expect(id.isMale()).toBeTruthy();
    expect(id.isFemale()).toBeFalsy();
    expect(id.isBirthNumber()).toBeTruthy();
    expect(id.isDNumber()).toBeFalsy();
    expect(id.isHNumber()).toBeFalsy();
    expect(id.isFhNumber()).toBeFalsy();
  });
});
