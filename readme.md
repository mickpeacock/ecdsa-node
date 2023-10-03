# ECDSA Node

## Project Description

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

## Solution

### Test Data

Use the following information to test the application:

User 1 - starts with balance of 100
Private Key: 5a4fd4f86a7b708849f3781313148f8582736d2fbb134e50dac29abf781ffa4b
Address:     4aad5d2edd1fa9c00705754dee0f1c8d8e43b4c5

User 2 - starts with balance of 50
Private Key: db5280138c5813a135331f37d945468e4ac7e922a46c66d40f3001c966771d92
Address:     becc0582729a9322b86e27444a8dab4665011aad

User 3 - starts with balance of 75
Private Key: 107a5575685deb71996c09bff182656c5d539e1dcba3f4a81408e3cb1936a86a
Address:     b7fe41f2052318c26761e4f7da53c620765bd3c6

### Known Deficiencies

1. The private key is used to access the wallet and to sigh the transfer
2. Private key entry should check that the entered private key is 32 bytes

### Public key to Address

Bitcoin and Ethereum both have a transformation process to take a public key and turn it into an address. For Bitcoin it includes a checksum and Base58 encoding. Ethereum's address transformation is quite a bit simpler, its address is the last 20 bytes of the hash of the public key.

The important thing to recognize here is that the address is differentiated from the public key, but you can always derive the address if you have the public key.
