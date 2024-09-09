

import { ethers } from "ethers";

import { JsonRpcProvider } from "ethers/providers";
const address = '0xa140750a9904d19a30cbd1516ac5a4589120d4c540833155390798d5b61ef7c7'; // Replace with the Ethereum address you want to query



const providerSepolia = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/AjgCaTtWe85TP-GxpxHuG8l77fYEwjF-`)

providerSepolia.getTransaction(address)
  .then(transactions => {
    console.log(transactions);
  })
  .catch(error => {
    console.error(error);
  });