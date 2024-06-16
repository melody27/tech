





#### 1. 可重入





预防方法：

1. checks-effect-interaction(即，转账之前先修改状态)

   ```solidity
   function withdraw() external {
       uint256 balance = balanceOf[msg.sender];
       require(balance > 0, "Insufficient balance");
       // 检查-效果-交互模式（checks-effect-interaction）：先更新余额变化，再发送ETH
       // 重入攻击的时候，balanceOf[msg.sender]已经被更新为0了，不能通过上面的检查。
       balanceOf[msg.sender] = 0;
       (bool success, ) = msg.sender.call{value: balance}("");
       require(success, "Failed to send Ether");
   }
   ```

   

2. 重入锁（实际就是装饰器）

   ```solidity
   uint256 private _status; // 重入锁
   
   // 重入锁
   modifier nonReentrant() {
       // 在第一次调用 nonReentrant 时，_status 将是 0
       require(_status == 0, "ReentrancyGuard: reentrant call");
       // 在此之后对 nonReentrant 的任何调用都将失败
       _status = 1;
       _;
       // 调用结束，将 _status 恢复为0
       _status = 0;
   }
   ```








#### 2. 选择器强碰撞



> 本质上就是通过手动决定选择器来进行任意代码执行。

由于选择器只有4个字节，所以非常容易直接进行强碰撞。

demo:

```solidity
contract SelectorClash {
    bool public solved; // 攻击是否成功

    // 攻击者需要调用这个函数，但是调用者 msg.sender 必须是本合约。
    function putCurEpochConPubKeyBytes(bytes memory _bytes) public {
        require(msg.sender == address(this), "Not Owner");
        solved = true;
    }

    // 有漏洞，攻击者可以通过改变 _method 变量碰撞函数选择器，调用目标函数并完成攻击。
    function executeCrossChainTx(bytes memory _method, bytes memory _bytes, bytes memory _bytes1, uint64 _num) public returns(bool success){
        (success, ) = address(this).call(abi.encodePacked(bytes4(keccak256(abi.encodePacked(_method, "(bytes,bytes,uint64)"))), abi.encode(_bytes, _bytes1, _num)));
    }
}
```
> 这里通过强碰撞能够手动的调用`putCurEpochConPubKeyBytes`函数，造成“任意函数执行”。

注意：

+ _method参数会拼接`"(bytes,bytes,uint64)"`，所以选择器实际上是`keccak256(_method+"(bytes,bytes,uint64)")`。但是无所谓，只需要碰撞得到的选择器和`putCurEpochConPubKeyBytes(bytes)`选择器相同就行。比如:`keccak256("func10487987874260605968(bytes,bytes,uint64)")`
+ call的第二个后面参数如果少了的话，会报错回滚。但是如果参数多了的话则不会进行回滚，还是正常执行。





#### 3. 重放攻击

> 这里是基于合约层面的重放攻击。



某些合约直接接收签名作为一次授权的校验。看如下代码

```solidity
function transferProxy(address _from, address _to, uint256 _value, uint256 _fee,
    uint8 _v, bytes32 _r, bytes32 _s) public returns (bool){

    if(balances[_from] < _fee + _value 
        || _fee > _fee + _value) revert();

    uint256 nonce = nonces[_from];      // 重点是此处的编码函数
    bytes32 h = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",gethash(_from,_to,_value,_fee,nonce)));
    if(_from != ecrecover(h,_v,_r,_s)) revert();
    if(balances[_to] + _value < balances[_to]
        || balances[msg.sender] + _fee < balances[msg.sender]) revert();
    balances[_to] += _value;

    balances[msg.sender] += _fee;

    balances[_from] -= _value + _fee;
    nonces[_from] = nonce + 1;
    return true;
}
```

> 这里`_from`是授权用户，使用签名授权`msg.sender`来发起一次余额转移，转移到`_to`去。这里`_r,_s,_v`是用来进行`ecrecover`签名验证的数据

这里由于只校验了发送者，接受者，nonce。所以可能会导致不同合约的同一函数，只要nonce能够对齐，校准就能够进行重放冲击。同一个发送者，接受者。只要尝试把nonce的值对齐，就能够重复使用签名进行攻击。



如果想要避免的话，需要签名的时候，额外签名一个合约地址。如下：

```solidity
    bytes32 h = keccak256(_from,_to,_value,_fee,nonce,address(this));
```



[漏洞分析帖](https://mp.weixin.qq.com/s/kEGbx-I17kzm7bTgu-Nh2g)
