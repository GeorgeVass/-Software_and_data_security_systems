'use strict';

const crypto = require('crypto');
const data = 'GeorgeVailyev';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048,});
const signature = (plainText, privateKey) => crypto.sign('SHA256', Buffer.from(plainText), privateKey);
const isVerified = (plainText, publicKey, signature) => crypto.verify('SHA256', Buffer.from(plainText), publicKey, signature);
const sign = signature(data, privateKey);
console.log(`Data : ${data}`)

const verification = () => {
    return isVerified(data, publicKey, sign) ? "Signature is verified" : "signature is not verified"
}
console.log(verification());