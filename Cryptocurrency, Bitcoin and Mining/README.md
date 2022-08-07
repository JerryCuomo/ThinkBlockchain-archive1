# Cryptocurrency, Bitcoin and Mining    

## Let's review the code then run it!

**Please submit a PR with your answers.  Your answers should be added to this README.md file.** 

**1.  Go into the sampecode directory and open the mining.js code**.    
`cd samplecode/Duckchain`.    
 and open the `mining.js` file with your editor of choice.      

**2.  What function was added?**.    
mineBlock.        


**3.  Run a diff between duckchain.js and mining.js and paste the out put here.**.
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
2.  The mineBlock function has a tight loop while loop that will run until `
 

