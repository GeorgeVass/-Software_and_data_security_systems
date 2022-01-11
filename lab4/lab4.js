'use strict';

const util = require('util');
const forge = require('node-forge');
const bignum = require('big.js');

const GenProbPrime = util.promisify(forge.prime.generateProbablePrime);

var options = {
    algorithm: {
        name: 'PRIMEINC',
        workers: -1,
    },
};

class RSA {
    static async generateBigNumber (bits) {
        const Number = await GenProbPrime(bits, options);
        return new bignum(Number.toString());
    };
    static Add(a, b) {
        return a.plus(b);
    }
    static Mul(a, b) {
        return a.mul(b);
    }
    static Pow(a) {
        return a.pow(2);
    }
    static Mod(a, n) {
        return a.mod(n);
    }
}

(async () => {
    try {
        var A = await RSA.generateBigNumber(2048);
        var B = await RSA.generateBigNumber(2048);
        console.log("A : " + A);
        console.log("B : " + B);
        console.log("Sum is : " + RSA.Add(A, B).toString());
        console.log("Multiply is : " + RSA.Mul(A, B).toString());
        console.log("Powing is : " + RSA.Pow(A).toString());
        console.log("Mod is : " + RSA.Mod(A, B).toString());
    } catch (err) {
        console.error(err);
    }
})();