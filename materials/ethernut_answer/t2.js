import { ethers } from "ethers";
const providerSepolia = new ethers.JsonRpcProvider(`http://127.0.0.1:8545`)

const private_key = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'          // 注意，这里填入你的私钥

const wallet = new ethers.Wallet(private_key,providerSepolia)

const abi = [
    "function this_is(address)public"
]
const address_contract = '0x5FbDB2315678afecb367f032d93F642f64180aa3'           // 注意这里替换address
// const address_contract = '0xBaFE941652455bf1f6D40b22e48e22f0e9F0c589'
const contract = new ethers.Contract(address_contract,abi,wallet)               // 因为static_call，暂时注释掉
// const contract = new ethers.Contract(address_contract,abi,providerSepolia)
const target_contract_address = '0x5FbDB2315678afecb367f032d93F642f64180aa3'




console.log(wallet.address)
// console.log(param1)
// console.log()

// const overrides = {
//     gasLimit: "3010944" // 设置gasLimit为100,000
//     // nonce: await wallet.getTransactionCount() // 获取并设置nonce（可选）
// };

// const balanceWETH = await contract.this_is(target_contract_address,overrides)
// let status  = await balanceWETH.wait()
// console.log(status.status)
// throw 1

let i = 0
while(i<8191){

    try{
        const overrides = {
            gasLimit: "3010944" // 设置gasLimit为100,000
            // nonce: await wallet.getTransactionCount() // 获取并设置nonce（可选）
        };
        const balanceWETH = await contract.this_is(target_contract_address,overrides)
        let status  = await balanceWETH.wait()
        console.log(status.status)
        break
    }catch (error) {
        console.error("Error making static call:", error);
        if(error.code == "execution reverted"){
            console.log(3010944+i)
        }
    }
    i+=1
    console.log("i = "+i)
    // break                   // 待会注释
}

console.log("find it is ")
console.log(i+99900000)


// 4093