import { ethers } from "ethers";
const providerSepolia = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/AjgCaTtWe85TP-GxpxHuG8l77fYEwjF-`)

const private_key = ''          // 注意，这里填入你的私钥

const wallet = new ethers.Wallet(private_key,providerSepolia)

const abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"consecutiveWins","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_guess","type":"bool"}],"name":"flip","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]'
const address_contract = '0x75d5E380AfDc46249b658f16dCFea06CA9c9FD75'           // 注意这里替换address
const contract = new ethers.Contract(address_contract,abi,wallet)

// const tx = await contract.flip(true)
// await tx.wait()
// const tx = await contract.consecutiveWins()

// console.log(tx)



// console.log(latestBlockNumber)
// const latestBlock = await providerSepolia.getBlock(latestBlockNumber);
// console.log(latestBlock['miner'])


// contract准备代码
const overrides = {
    gasPrice: ethers.parseUnits('200', 'gwei'),// 设置gasPrice为50 gwei
    gasLimit: "100000" // 设置gasLimit为100,000
    // nonce: await wallet.getTransactionCount() // 获取并设置nonce（可选）
  };






// 逻辑代码
let a = 0

let latestBlockNumber = await providerSepolia.getBlockNumber()


let target = ethers.getBigInt("57896044618658097711785492504343953926634992332820282019728792003956564819968")
let tepnumber=0;
let tx;
while(a<1){
    tepnumber = await providerSepolia.getBlockNumber()
    if(tepnumber == latestBlockNumber){
        
    }else {
        a+=1
        latestBlockNumber = tepnumber
        let block = await providerSepolia.getBlock(tepnumber);
        let block_hash = block['hash']

        let blockHashInt = ethers.getBigInt(block_hash);

        if(blockHashInt > target){
            tx = await contract.flip(1,overrides)
            // await tx.wait()
        }else{
            tx = await contract.flip(0,overrides)
            // await tx.wait()
            console.log(`${latestBlockNumber}:${tx.hash}`)
        }
    }

}

