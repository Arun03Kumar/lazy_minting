import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import cont from "../artifacts/contracts/LazyNFT.sol/LazyNFT.json";
// console.log(cont);

const NFT = [];

const Mint = ({ address }) => {
  async function m() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      cont.abi,
      signer
    );
    const name = await contract.name();
    console.log(name);
    console.log(await signer.getAddress());
  }
  m();
  //   const contract = fetchContract(signer);
  //   const signAdd = await signer.getAddress()
  async function mint() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", cont.abi, signer)
    // const name = await contract.name()
    // console.log(address)
    const minter = await signer.getAddress()
    console.log(minter)
    const tokenId = 1;
    const price = 50;
    const buyer = address;
    // console.log(buyer)
    const uri = "akjsfhakljfh";

    const domain = {
      name: "LazyMint",
      version: "1",
      chainId: 1337,
      verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    };
    const types = {
      LazyNFTVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
        { name: "uri", type: "string" },
        { name: "buyer", type: "address" },
      ],
    };
    const voucher = {
      tokenId: tokenId,
      price: price,
      uri: uri,
      buyer: buyer,
    };
    // console.log("Sad");
    const signature = await signer._signTypedData(domain, types, voucher);
    NFT.push({ ...voucher, signature, minter});
    // console.log(NFT)

    // const domain = {
    //     name: "My App",
    //     version: "1",
    //     chainId: 1337,
    //     verifyingContract: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    //   };
    //   const types = {
    //     Mail: [
    //       { name: "from", type: "Person" },
    //       { name: "to", type: "Person" },
    //       { name: "content", type: "string" },
    //     ],
    //     Person: [
    //       { name: "wallet", type: "address" },
    //     ],
    //   };
    //   const mail = {
    //     from: {
    //       wallet: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    //     },
    //     to: {
    //       wallet: "0xF54FA485c2c56d6822D4DFf9811e83d8e5b34d39",
    //     },
    //     content: `setting value to `,
    //   };

    //   const signature = await signer._signTypedData(domain, types, mail);
    // console.log(signature)
  }

  const [tok, settok] = useState("");
  // console.log(tok)

  async function verify() {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      cont.abi,
      signer
    );
    const add = await signer.getAddress()
    console.log("Saf2", NFT);
    console.log()

    NFT.forEach(async (element) => {
      console.log(element.tokenId);

      if (element.tokenId == tok) {
        console.log("Saf");
        // const recover = await contract.recover([
        //   element.tokenId,
        //   element.price,
        //   element.uri,
        //   element.buyer,
        //   element.signature,
        // ]);
        // console.log(recover);

        const tokenId = 1;
        const price = 50;
        const buyer = address;
        const uri = "akjsfhakljfh";

        const domain = {
          name: "LazyMint",
          version: "1",
          chainId: 1337,
          verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        };

        const types = {
          LazyNFTVoucher: [
            { name: "tokenId", type: "uint256" },
            { name: "price", type: "uint256" },
            { name: "uri", type: "string" },
            { name: "buyer", type: "address" },
          ],
        };
        const voucher = {
          tokenId: tokenId,
          price: price,
          uri: uri,
          buyer: buyer,
        };
        const recoveredAddress = ethers.utils.verifyTypedData(
          domain,
          types,
          voucher,
          element.signature
        );
        // console.log(NFT.minter, recoveredAddress)
        if(element.minter == recoveredAddress){
          await contract.safeMint(voucher.tokenId, add, voucher.uri)
          console.log("Successfully minted")
        }
      }
    });
  }

  return (
    <div>
      <button onClick={mint}>mint</button>
      <div>
        <input
          type="text"
          name="token"
          id="token"
          onChange={(e) => settok(e.target.value)}
        />
        <button onClick={verify}>Buy</button>
      </div>
    </div>
  );
};

export default Mint;
