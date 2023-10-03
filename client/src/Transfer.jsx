import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

function Transfer({ privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  // const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const detailsToSign = { recipient: recipient, amount: parseInt(sendAmount)} ;
    const hash = keccak256(utf8ToBytes(JSON.stringify(detailsToSign)));
    const signature = secp.secp256k1.sign(hash, privateKey); //, {recovered: true});

    // console.log("Details to sign: ", detailsToSign);
    // console.log("hash: ", hash);
    // console.log("Signature(object): ", signature);
    // console.log("Signature(toCompactHex): ", signature.toCompactHex());
    
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        signature: signature.toCompactHex(),
        recovery: signature.recovery,
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      {/* <label>
        Private Key
        <input
          placeholder="Enter private key to sign the transaction"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label> */}

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
