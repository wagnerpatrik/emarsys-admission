const { describe, it } = require('mocha');
const { expect } = require('chai');

const generateRoute = require('../holiday-planner/app');
const transformInput = require('../shared/helpers');
const { INPUT_VALIDATION_ERROR } = require('../shared/constants');

describe('transformInput()', () => {
  it('given destination with or without separator, transformInput() should return arrays of the destination', () => {
    const input = ['x => ', 'y', 'z  '];
    const expected = [['x'], ['y'], ['z']];

    input.forEach((destination, i) => expect(transformInput(destination)).to.eql(expected[i]));
  });

  it('given destinations with or without separator, transformInput() should return arrays of one or two the destination', () => {
    const input = ['x z', 'y  z', 'z '];
    const expected = [['x', 'z'], ['y', 'z'], ['z']];

    input.forEach((destination, i) => expect(transformInput(destination)).to.eql(expected[i]));
  });

  it('given destinations with two destination dependency, transformInput() should throw Error', () => {
    const input = 'x z l';

    expect(() => transformInput(input)).to.throw(INPUT_VALIDATION_ERROR);
  });
});

describe('generateRoute()', () => {
  describe('given no destination, generateRoute()', () => {
    const destionation = null;
    const expectation = '';

    it('should return an empty string', () => {
      const result = generateRoute(destionation);
      expect(result).be.equal(expectation).and.be.lengthOf(0);
    });
  });

  describe('given destinations without dependency, generateRoute()', () => {
    it('should return the destinations in order as the optimised routes v1', () => {
      const destionation = ['x => ', 'y => '];
      const expectation = 'xy';
      const result = generateRoute(destionation);
      expect(result).be.equal(expectation).and.be.lengthOf(2);
    });

    it('should return the destinations in order as the optimised routes v2', () => {
      const expectation = 'wxyz';
      const destionations = ['w => ', 'x => ', 'y', 'z'];
      const result = generateRoute(destionations);
      expect(result).be.equal(expectation).and.be.lengthOf(4);
    });
  });

  describe('given destinations, each with distinct dependency, generateRoute()', () => {
    it(`should return the destination dependencys before its dependent as the optimised routes v1`, () => {
      const expectation = 'xw';
      const destionations = ['w => x'];
      const result = generateRoute(destionations);
      expect(result).be.equal(expectation).and.be.lengthOf(2);
    });

    it(`should return the destination dependencys before its dependent as the optimised routes v2`, () => {
      const expectation = 'xwzy';
      const destionations = ['w => x', 'y => z'];
      const result = generateRoute(destionations);
      expect(result).be.equal(expectation).and.be.lengthOf(4);
    });
  });

  describe(`given a destination dependency thats dependent already in the route, generateRoute()`, () => {
    it('should return the optimised route by removing the just added destination dependency and pusing it before the dependent v1', () => {
      const expectation = 'uzwvxy';
      const destionations = ['u => ', 'v => w', 'w => z', 'x => u', 'y => v', 'z => '];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(6);
    });

    it('should return the optimised route by removing the just added destination dependency and pusing it before the dependent v2', () => {
      const expectation = 'wyuvxz';
      const destionations = ['u => y', 'v => u', 'w => ', 'x => u', 'y => w', 'z => '];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(6);
    });
  });

  describe(`given destionations in which both des dep and destination in the route and the des dep on a lower index than its dependent, generateRoute()`, () => {
    it('should return the optimised route by not removing the destination dependency before the dependent', () => {
      const expectation = 'vxwzy'; 
      const destionations = ['vw', 'wx', 'xv', 'yz', 'zv'];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(5);
    });
  });
});
