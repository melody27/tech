<center>Defi</center>



#### 1. 概述





**区别**

cefi 和 Defi区别

![](../img/block_s_60.png)



**优势**

![](../img/block_s_61.png)



**Defi技术栈**

![](../img/block_s_62.png)



**Cefi and Defi联系、类比**

![](../img/block_s_63.png)





**Defi map**

![](../img/block_s_64.png)



##### Defi 服务



###### Asset Tokenization

> 资产代币化。Tokenization: process of adding new assets to a blockchain



###### 稳定币

+ Offchain (centralized) collateral [by 法币，贵金属]
+ Onchain (decentralized) collateral [by 加密资产]
+ Algorithmic (non-collateral) stable coin

> 但实际上算法稳定币并不十分稳定



######  Decentralized Exchange

cex dex对比![](../img/block_s_65.png)



######  **交易模式**

1. cex：采用order book（挂单薄）
2. 采用各种AMM具体模型进行交易进行交易



+ Decentralized Lending

```
Cefi: 违约执行成本高。依靠于对客户的信任

Defi：超额抵押，不依靠于信用；包括Collateralized debt positions,Collateralized debt markets(p2p抵押借贷和抵押池)；低额抵押(还在探索中)
闪电贷 or 去中心化金融衍生品 or 去中心化保险
```



######  **Defi security**

DeFi Security - Issues on all Layers --- 区块链所有层安全问题都是defi安全问题



1. Technical structure security
2. Economic incenKve security(ps.比如说Front-running attacks)

![](../img/block_s_66.png)







 ###### Defi Privacy

> just pseudonymous, not anonymous in blockchain



in fact,(Non-existent) Privacy in DeFi



##### blockchain



###### signature

Families of signature schemes：

![](../img/block_s_67.png)



###### 扩容问题

Many approaches to scaling blockchains:

+ Faster consensus: modern blockchains (e.g., Solana, Polkadot, Avalanche, …) 



+ Payment channels: most Tx are off chain Peer-to-Peer (e.g., Lightening)(离线进行点对点交易)



+  Layer 2 approaches:
  zkRollup, optimistic Rollup: batch many Tx into a single Tx
  			从这个角度来说的话，layer2 中并不完全包括lightening network。并且ZK和OProllup也不全算是Layer2的解决方案



+ Sidechains: Polygon and others



+ many other ideas …



介绍rollup

1. zk-rollup

​	![](../img/block_s_68.png)

​	![](../img/block_s_69.png)

​	![](../img/block_s_70.png)

其中，如果在L2内进行交易则价格较低，但是如果是L2转到L1则十分昂贵。并且L2转到其他的L2如果要经过L1则很昂贵，如果直接只经过二层则相对较低一点点。



并且相对来说，如果能够经过zkEVM的话。那么从L1迁移DAPP到L2则会比较容易



2. Optimistic Rollup (simplified) [e.g., Optimism, Arbitrum] 

​	![](../img/block_s_71.png)





###### 跨链

![](../img/block_s_72.png)

![](../img/block_s_73.png)

![](../img/block_s_74.png)





##### DEX



###### 传统交易所

采用订单薄模式

![](../img/block_s_75.png)



早期DEX也采用订单薄形式，大概对比如下

![](../img/block_s_76.png)



其中，订单薄的DEX好处如下：

![](../img/block_s_78.png)



###### AMM 



AMM基本逻辑：

![](../img/block_s_79.png)



需要额外注意的是`滑点`

![](../img/block_s_80.png)

> 有时候意想不到的滑点可能会导致损失





但是现在很多的DEX都有滑点保护的选项![](../img/block_s_81.png)



AMM机制的优缺点![](../img/block_s_82.png)



###### 稳定币



大概分为三类：

+ Reserve-based
+ Collateral-based（基于抵押）
+ Algorithmic



但是实际上算法稳定币并不稳定，币价是真的可能会脱钩。

但是有些货币可能是中心化的，比如USDT。这玩意儿其官方想冻结就冻结。



稳定币优缺点![](../img/block_s_83.png)



`Curve`是目前最大的稳定币交易所，主营就是稳定币，锚定资产

![](../img/block_s_85.png)

> 可以看到其采用了特殊，与uniswap不同的曲线。所以更加稳定一点



![](../img/block_s_84.png)

另外看官方文档时注意：

![](../img/block_s_77.png)





###### Arbitrage

> 现在AMM下的套利，都很难人力来做的了。而是用脚本，算法，来自动检测和执行。



###### 无常损失

> 实际逻辑容易理解

![](../img/block_s_86.png)

[无常损失计算器](https://dailydefi.org/tools/impermanent-loss-calculator/)





###### DEX聚合器

![](../img/block_s_88.png)

> 由于涉及多个交易和智能合约调用，可能会产生额外的交易费用
>
> 虽然聚合器整合了多个 DEX 的流动性，但整体流动性仍可能不足，尤其是在处理大额交易时。这可能会导致滑点增加，用户未能获得预期的价格优势

> 如果一个用户希望交易大量的 ETH 到 USDT。即使聚合器连接了多个 DEX，如 Uniswap、SushiSwap 和 Balancer，每个 DEX 上的流动性池深度可能不足以单独处理如此大额的交易。聚合器会尝试在多个 DEX 上拆分订单，但如果这些 DEX 的池深不足，部分交易会以不利的价格执行，从而导致滑点增加。

+ 1inch：
  + Aggregates many DEX
  + Routing（）
+ SwapSwap
  + Aggregates 2 DEX
  + Routing & Arbitrage







最后一节
