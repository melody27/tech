import { ethers } from "ethers";
// const providerSepolia = new ethers.JsonRpcProvider(`http://127.0.0.1:8545`)
const providerSepolia = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/AjgCaTtWe85TP-GxpxHuG8l77fYEwjF-`)



// const private_key = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'          // 注意，这里填入你的私钥
const private_key = 'cf2344b8854a191e86aef3a76115dae20bb27debe5f423f47e5944f19783675c'          // 注意，这里填入你的私钥


const wallet = new ethers.Wallet(private_key,providerSepolia)


const abi = [
    "function this_is(address)public"
]

const address_contract = '0x64E8383c025a397699282F8376d44c64d47472fe'           // 注意这里替换address
const target_contract_address = '0x78be1BC84Ab82b4f43B7ff550861f9f5d978A206'    // sepolia上正确a1合约地址的0x957023590D79c7275Ee4360Fc62B5e1A50BaCeD6
// const address_contract = '0xBaFE941652455bf1f6D40b22e48e22f0e9F0c589'
const contract = new ethers.Contract(address_contract,abi,wallet)



// const param1 = contract.interface.encodeFunctionData(
//     "function this_is(address addr) returns()",
//     [target_contract_address]
//   );


// console.log(wallet.getAddress())
// console.log(param1)
// console.log()

const overrides = {
    gasLimit: "3010944" // 设置gasLimit为100,000
    // nonce: await wallet.getTransactionCount() // 获取并设置nonce（可选）
};
const balanceWETH = await contract.this_is(target_contract_address,overrides)
let status  = await balanceWETH.wait()
console.log(status)


throw 1

let i = 0
while(i<8191){

    try{
        const tx1 = {
            to: address_contract,
            data: param1,
            gasLimit: 9010943+i// 设置gasLimit为100,000
        };
        
        let receipt1 = await wallet.sendTransaction(tx1) 
        console.log(receipt1)
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
console.log(i+99900000 )


// 4093