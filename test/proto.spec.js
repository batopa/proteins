/* eslint-env mocha */
import { entries, methods, properties, has, reduce, get } from '../src/proto.js';
import chai from 'chai/chai';

const { assert } = chai;

describe('Unit: Proto', () => {
    class A {
        get prop() {
            return null;
        }

        test() {}
    }

    class B extends A {
        test() { }

        test2() { }
    }

    class C extends B {
        constructor() {
            super();
            this.id = 1;
        }

        get prop() {
            return null;
        }
        
        get prop2() {
            return null;
        }
    }

    class D extends C {
        test3() { }

        test4() { }

        get prop() {
            return null;
        }

        get prop3() {
            return null;
        }

        get prop4() {
            return null;
        }
    }

    it('should recognize prototype keys', () => {
        let res = Object.keys(entries(D)).sort();
        assert.equal(res.length, 9);
        assert.deepEqual(res, ['constructor', 'prop', 'prop2', 'prop3', 'prop4', 'test', 'test2', 'test3', 'test4']);
    });

    it('should recognize prototype methods', () => {
        let res = Object.keys(methods(D)).sort();
        assert.equal(res.length, 4);
        assert.deepEqual(res, ['test', 'test2', 'test3', 'test4']);
    });

    it('should recognize prototype properties', () => {
        let res = Object.keys(properties(D)).sort();
        assert.equal(res.length, 4);
        assert.deepEqual(res, ['prop', 'prop2', 'prop3', 'prop4']);
    });

    it('should retrieve all descriptors for a property', () => {
        assert.equal(reduce(Object, 'prop').length, 0);
        assert.equal(reduce(A, 'prop').length, 1);
        assert.equal(reduce(B, 'prop').length, 1);
        assert.equal(reduce(C, 'prop').length, 2);
        assert.equal(reduce(D, 'prop').length, 3);
    });

    it('should detect property existence', () => {
        assert(has(D, 'prop3'));
        assert(has(D, 'test3'));
        assert(has(D, 'constructor'));
        assert(!has(B, 'prop3'));
        assert(!has(B, 'test3'));
        assert(has(B, 'constructor'));
    });

    it('should retrieve prototype', () => {
        let a = new A();
        assert(typeof get(a).test === 'function');
        assert(get(a).prop === null);
        assert(A.prototype === get(a));
    });
});
