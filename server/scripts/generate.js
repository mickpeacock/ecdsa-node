const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey(); 
const publicKey = secp.secp256k1.getPublicKey(privateKey); 

function getAddress(publicKey) {
    // the first byte indicates whether this is in compressed form or not
    return keccak256(publicKey.slice(1)).slice(-20);
}
const address = getAddress(publicKey);

console.log(`Private Key: `,toHex(privateKey)) ;
console.log(`Public Key: `,toHex(publicKey)) ;
console.log(`Address: `,toHex(address)) ;