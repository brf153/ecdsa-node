const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {retrieveAddress} = require("./scripts/address.js")

app.use(cors());
app.use(express.json());

const balances = {
  "444feacf04e8509009d71f8a9cc6d03043121694ecdb660318c74ab6736a3be0": 100, //For Private Key: 66b2a9c84918f1c9f68ab423260a5e569c5d29a11e45cf4d033a357e55d52931
  "ca65562ae4af68ca319bde4d9d79f5719285308eda80239627020cec1ad61c99": 50, //For Private Key: 6127c84c10f18f1065ebe1682e97228784bbbe19585b6877d9e12d4bdcdaf3d8 
  "47e5fae90fe266e80c2d98aae3760576ab3d53e1d32c79d42af5d3e0ef17be63": 75, //For Private Key: b83823d0b98eeb4202baf301c8674993c5514b13d14388c6d7eed3199f7b4146
};

app.get("/balance/:privateKey", async(req, res) => {
  const { privateKey } = req.params;
  const message = "hello"
  const address = await retrieveAddress(message,privateKey)
  // console.log(address.slice(0,40))
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async(req, res) => {
  const { sender, recipient, amount } = req.body;
  const message = "hello"

  const senderAddress = await retrieveAddress(message, sender);
  const receiverAddress = await retrieveAddress(message, recipient);

  setInitialBalance(senderAddress)
  setInitialBalance(receiverAddress)

  if (balances[senderAddress] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[senderAddress] -= amount;
    balances[receiverAddress] += amount;
    res.send({ balance: balances[senderAddress] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
