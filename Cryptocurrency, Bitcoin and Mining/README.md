# Cryptocurrency, Bitcoin and Mining    

## Let's review the code then run it!

Go into the sampecode directory and open the mining.js code in a new tab on your browser. Keep this tab open!   
[mining.js](https://github.com/JerryCuomo/ThinkBlockchain/blob/main/samplecode/Duckchain/mining.js)
   
**1.  What function was added?**.    
mineBlock. 

Here is 

```
    mineBlock(difficulty) {
        console.log("mining block.."+difficulty);
        while (this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
```

**2.  What is a nonce?**   

**3.  Why have a nonce?**

**4.  What is the while() looping trying to achieve?**

Here is a run of mining.js.  Please try on your own: `node mining.js`**. 
```
barrymosakowski@barrymosakow-mac Duckchain % node mining.js
mining block..3
mining block..6
{
  "chain": [
    {
      "index": 0,
      "data": "Genesis Block Quack Quack!",
      "nonce": 0,
      "hash": "7aa486e9adf2626464fd8e7e3abae6614ad0c8d587dd5b95fd2809755c439718",
      "previousHash": 0
    },
    {
      "index": 1,
      "data": "donald",
      "nonce": 5166,
      "hash": "000ad18b8f20f6f0f38d05551428868943ebd3c2e35baea563b5fe5287423233",
      "previousHash": "7aa486e9adf2626464fd8e7e3abae6614ad0c8d587dd5b95fd2809755c439718"
    },
    {
      "index": 2,
      "data": "daffy",
      "nonce": 30141575,
      "hash": "000000ffb8442375617ee41ce5971983b0ba07e722ee6e03e3fe446618812ac5",
      "previousHash": "000ad18b8f20f6f0f38d05551428868943ebd3c2e35baea563b5fe5287423233"
    }
  ],
  "difficulty": 6
}
Is the Duckchain valid? true
barrymosakowski@barrymosakow-mac Duckchain % 
``` 

**5.  For index=2 how many times do we loop trying to find the correct nonce?**  

**6. What is missing to make this a true blockchain implementation??**.     
Consensus!  The code is great and does an excellent job representing the structures and algorithms.  That being said, the power of blockchain is the aspect of distributed computing.  If we simply add a mechanism for the nodes running mining.js (or even duckchain.js) with each other and verify the results through a consensus algorithm....we will be ready to ship!     
Note: this is easier said than done! 

**7.  In the current state is mining.js a distributed application (DApp)?**  


 

