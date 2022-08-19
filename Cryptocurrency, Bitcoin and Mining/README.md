# Cryptocurrency, Bitcoin and Mining    

## Let's review the code then run it!

Go into the sampecode directory and open the mining.js code in a new tab on your browser. Keep this tab open!   
[mining.js](https://github.com/JerryCuomo/ThinkBlockchain/blob/main/samplecode/Duckchain/mining.js)
   
**1.  What function was added?**.    
mineBlock.        


**2.  Run a diff between duckchain.js and mining.js and paste the out put here.**.
```
barrymosakowski@barrymosakow-mac Duckchain % diff duckchain.js mining.js
7c7
<     constructor(index, data, previousHash) {   
---
>     constructor(index, data) {   
11a12
>         this.nonce = 0;                     // used to add variety to hash calc (based on difficulty)
13c14
<         this.previousHash= previousHash;    // the hash of the previous block
---
>         this.previousHash= 0;               // the hash of the previous block is calculated with all new blocks
16c17
<     // method that calculates the hash or a block
---
>     // method that calculates the hash of a block
19,23c20,37
<         let newHash = SHA256(this.index +                // include the index 
<                             JSON.stringify(this.data) +  // all the data 
<                             this.previousHash);          // and the previous hash
<         return(newHash.toString());                // returns a 64-character hash
<     }                  
---
>         let newHash = SHA256(this.index +     // include the index 
>             JSON.stringify(this.data)   +     // all the data 
>             this.nonce                  +     // include the nonce too
>             this.previousHash);               // and the previous hash
>         return(newHash.toString());           // returns a 64-character hash
>     }       
> 
>     // method to mine a new block by repeatedly calculating a new hash
>     // until the hash string starts with several "000" that match difficulty
>     // if no match found, increment the nonce which changes block content
>     // that ensures new hash calculation will differ from previous
>     mineBlock(difficulty) {
>         console.log("mining block.."+difficulty);
>         while (this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
>             this.nonce++;  
>             this.hash = this.calculateHash();
>         }
>     }
33c47,49
<     }                                             // starting with genesis block
---
>                                                   // starting with genesis block
>         this.difficulty = 1;
>     }                                             
38,40c54,55
<         let genesisBlock = new Block(0,     // the index is zero because its block 0 
<                                     genesisData,       // data for the genesis block 
<                                     "0");              // there is no previous block 
---
>         let genesisBlock = new Block(0,           // the index is zero because its block 0 
>                                     genesisData); // data for the genesis block 
46c61
<       //let last = this.chain.length - 1; // calculate last item in the change 
---
>       //let last = this.chain.length - 1; // calculate last item in the chain
57c72
<         newBlock.hash = newBlock.calculateHash();
---
>         newBlock.mineBlock(this.difficulty);
88a104,105
> 
> duckchain.difficulty = 3;
89a107,108
>  
> duckchain.difficulty = 6;
90a110
> 
92c112
< console.log(JSON.stringify(duckchain, null, 4));          
---
> console.log(JSON.stringify(duckchain, null, 2));          
95,100d114
< 
< // Tamper with the chain and test validity again
< console.log("\nLet us do some hacking!");
< duckchain.chain[1].data = "howard";
< duckchain.chain[1].hash = duckchain.chain[1].calculateHash();
< console.log('Is the Duckchain valid? ' + duckchain.isChainValid());
\ No newline at end of file
barrymosakowski@barrymosakow-mac Duckchain %
```

**4. Describe the two major changes in the code**.
1.  In calculateHash() the nonce was added to the newHash variable.     
2.  The mineBlock function has a tight loop while loop that will run until the hash starts with 000.         

**5. Explain in words what is occurring in this snippet of code**.   
```
    mineBlock(difficulty) {
        console.log("mining block.."+difficulty);
        while (this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
```
This is the mining...let's explain.  We identify the difficulty of the mine by the number of leading zeros we must have in hash.  For example, if the difficulty is three, then the hash must start with 000.  How do we get this?  This is achieved through the nonce.   So what the code is doing is running in a tight loop where the hash must start with "000" as shown in line 109.  If it does not, we supply add one to the nonce, recalculate the hash, and again check for the leading zeros.   You can easily prove this by adding some print statments in the code.   Now, what gets very interesting is the number of leading 0's.  The difficulty factor grows exponentially. The rule of thumb is for every leading zero, the number of possibilites doubles.     

**6. Run mining.js : `node mining.js` and paste the results here**. 
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

**7. What is missing to make this a true blockchain implementation**.     
Consensus!  The code is great and does an excellent job representing the structures and algorithms.  That being said, the power of blockchain is the aspect of distributed computing.  If we simply add a mechanism for the nodes running mining.js (or even duckchain.js) with each other and verify the results through a consensus algorithm....we will be ready to ship!     
Note: this is easier said than done! 

 

