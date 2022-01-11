'use strict';

const crypto = require('crypto');
const fs = require('fs');

(function generateKeyFiles() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: ''
        }
    });

    fs.writeFileSync("PublicKey", keyPair.publicKey);
    fs.writeFileSync("PrivateKey", keyPair.privateKey);
})();


const Decrypted_String = (ciphertext, privateKeyFile) => {
    const privateKey = fs.readFileSync(privateKeyFile, "utf8");
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: '',
        },
        Buffer.from(ciphertext, "base64")
    );
    return decrypted.toString("utf8");
}

const Encrypted_String = (plaintext, publicKeyFile) => {
    const publicKey = fs.readFileSync(publicKeyFile, "utf8");
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plaintext));

    return encrypted.toString("base64");
};

const encrypted = Encrypted_String("George", "./PublicKey");

console.log(`encrypted data:  ${encrypted}`);
console.log(`decrypted data:  ${Decrypted_String(encrypted, "PrivateKey")}`);