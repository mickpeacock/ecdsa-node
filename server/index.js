const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());
/* 
 * Key Pair 1
 * Private Key: 5a4fd4f86a7b708849f3781313148f8582736d2fbb134e50dac29abf781ffa4b
 * Public Key:  02f664c31a7a628a938f0637e4a3f148793ecfa5f804cb5776a6d48acba4051e10
 * Address:     0x4aad5d2edd1fa9c00705754dee0f1c8d8e43b4c5
 * Key Pair 2
 * Private Key: db5280138c5813a135331f37d945468e4ac7e922a46c66d40f3001c966771d92
 * Public Key:  02d0a25ef7a2056ed8495cc3561c48d508297f8f0083537e02fc84c964e48addd4
 * Address:     0xbecc0582729a9322b86e27444a8dab4665011aad
 * Key Pair 3
 * Private Key: 107a5575685deb71996c09bff182656c5d539e1dcba3f4a81408e3cb1936a86a
 * Public Key:  0399c1b14cb6b18131efeb82044b6a14cca02e00bcf96b13ebba89b8aa1e2a1df1
 * Address:     0xb7fe41f2052318c26761e4f7da53c620765bd3c6
 */
const balances = {
  "02f664c31a7a628a938f0637e4a3f148793ecfa5f804cb5776a6d48acba4051e10": 100, // PK 1
  "02d0a25ef7a2056ed8495cc3561c48d508297f8f0083537e02fc84c964e48addd4": 50,  // PK 2
  "0399c1b14cb6b18131efeb82044b6a14cca02e00bcf96b13ebba89b8aa1e2a1df1": 75,  // PK 3
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  
  console.log(`\nSender: ${sender}`);
  console.log(`Recipient: ${recipient}`);
  console.log(`Amount: ${amount}`);
  console.log(`Signature: ${signature}`);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
