const { describe, it } = require('mocha');
const { expect } = require('chai');
const generateRoute = require('../holiday-planner/app.js');

describe('generateRoute()', () => {
  describe('given no destination, generateRoute()', () => {
    const destionation = null;
    const expectation = '';

    it('should return an empty string', () => {
      const result = generateRoute(destionation);
      expect(result).be.equal(expectation).and.be.lengthOf(0);
    });
  });

  describe('given the most simple destination, generateRoute()', () => {
    const destionation = ['x => '];
    const expectation = 'x';

    it('should return the optimised route', () => {
      const result = generateRoute(destionation);
      expect(result).be.equal(expectation).and.be.lengthOf(1);
    });
  });

  describe('given multiple destinations without dependency, generateRoute()', () => {
    const destionations = ['x => ', 'y => ', 'z => '];
    const expectation = 'xyz';

    it('should return the optimised routes', () => {
      const result = generateRoute(destionations);
      expect(result).be.equal(expectation).and.be.lengthOf(3);
    });
  });

  describe('given multiple destinations with dependency, generateRoute()', () => {
    it('should return the optimised route by removing the dependency v1', () => {
      const expectation = 'yxz';
      const destionations = ['x => y', 'y => ', 'z => '];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(3);
    });

    it('should return the optimised route by removing the dependency v2', () => {
      const expectation = 'vwzxy';
      const destionations = ['v => ', 'w => ', 'x => z', 'y => ', 'z => '];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(5);
    });
  });

  describe('given multiple destinations with circular dependencies, generateRoute()', () => {
    it('should return the optimised route by swapping & removing the dependency v1', () => {
      const expectation = 'uzwvxy';
      const destionations = ['u => ', 'v => w', 'w => z', 'x => u', 'y => v', 'z => '];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(6);
    });

    it('should return the optimised route by swapping & removing the dependency v2', () => {
      const expectation = 'yzuvwx';
      const destionations = ['u => z', 'v => ', 'w => y', 'x => u', 'y =>', 'z => y'];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(6);
    });

    it('should return the optimised route by swapping & removing the dependency v3', () => {
      const expectation = 'wyuvxz';
      const destionations = ['u => y', 'v => u', 'w => ', 'x => u', 'y => w', 'z => '];
      const result = generateRoute(destionations);

      expect(result).be.equal(expectation).and.be.lengthOf(6);
    });
  });
});