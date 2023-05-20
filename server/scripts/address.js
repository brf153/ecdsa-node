const EC = require('elliptic').ec;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');

const toHash = (message)=>{
    return keccak256(utf8ToBytes(message))
}

const signMessage = (message,privateKey)=>{
    let hashMessage = toHash(message)
    const ec = new EC("secp256k1")
    const key = ec.keyFromPrivate(privateKey,"hex")
    const sign = key.sign(hashMessage,"hex")
    const recoveryParam = sign.recoveryParam
    return [sign, recoveryParam]
}

//testing signMessage
// console.log(signMessage("hello","privateKey"))

const retrievePublicKey= (message, privateKey)=>{
    const [signature,recoveryParam] = signMessage(message,privateKey)
    let hashMessage = toHash(message)
    const ec = new EC("secp256k1")
    const key = ec.recoverPubKey(hashMessage,signature,recoveryParam)
    const publicKey = key.encode("hex",true)
    return publicKey
}

const retrieveAddress=(message,privateKey)=>{
    const public_Key = retrievePublicKey(message,privateKey)
    const public_Key_Hash = keccak256(Buffer.from(public_Key,"hex"))
    const address = public_Key_Hash.slice(-40)
    return toHex(address)
}

//testing retrieveAddress
// console.log(retrieveAddress("hello", "privatekey"))

module.exports = {retrieveAddress}

// Addresses:-

// For Private Key: 66b2a9c84918f1c9f68ab423260a5e569c5d29a11e45cf4d033a357e55d52931
// Address: 444feacf04e8509009d71f8a9cc6d03043121694ecdb660318c74ab6736a3be0

// For Private Key: 6127c84c10f18f1065ebe1682e97228784bbbe19585b6877d9e12d4bdcdaf3d8 
// Address: ca65562ae4af68ca319bde4d9d79f5719285308eda80239627020cec1ad61c99

// For Private Key: b83823d0b98eeb4202baf301c8674993c5514b13d14388c6d7eed3199f7b4146
// Address: 47e5fae90fe266e80c2d98aae3760576ab3d53e1d32c79d42af5d3e0ef17be63

