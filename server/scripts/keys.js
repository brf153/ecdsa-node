const EC = require('elliptic').ec;

//Generating Private Key

function generatePrivateKey() {
  const ec = new EC('secp256k1');
  const keyPair = ec.genKeyPair();
  return keyPair.getPrivate('hex');
}

// Example usage
const privateKey = generatePrivateKey();
console.log('Private Key:', privateKey);



//Generating Public Key

function generatePublicKey(privateKey) {
    const ec = new EC('secp256k1');
    const key = ec.keyFromPrivate(privateKey, 'hex');
    return key.getPublic('hex');
  }
  
  // Example usage
  const publicKey = generatePublicKey(privateKey);
  console.log('Public Key:', publicKey);


//   Keys Generated 

// Private Key: 66b2a9c84918f1c9f68ab423260a5e569c5d29a11e45cf4d033a357e55d52931
// Public Key: 04c6da1d685840e5ec34685c58b7f3e0754e9a4b4c8429d53f00e75e3a25d2cd160a5046dc114ad8ffb6f4a5fbc2fca98d35625039dfcf1b11424aafaec4d2be12

// Private Key: 6127c84c10f18f1065ebe1682e97228784bbbe19585b6877d9e12d4bdcdaf3d8
// Public Key: 045f3e53e82735155827a047963a728c39158f5e163bad78bee00b7805515158b5a136e5d07f80c21d221556536f05639b9b05a7f0210685435f1b2caabb3bb369

// Private Key: b83823d0b98eeb4202baf301c8674993c5514b13d14388c6d7eed3199f7b4146
// Public Key: 042bd06525c77d94bd6b1e6b03d810f761dcf32e79749bee175169fb1534244edfda3a354aa1a24a7995681b3cac0b2ce779cacc1a552512d438a0a1af79b555f6