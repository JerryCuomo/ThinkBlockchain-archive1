# Cryptocurrency, Bitcoin and Mining    

## Let's review the code then run it!

**Please submit a PR with your answers.  Your answers should be added to this README.md file.** 

**1.  Go into the sampecode directory and open the mining.js code**.    
`cd samplecode/Duckchain`.    
 and open the `mining.js` file with your editor of choice.      

**2.  What function was added?**.    


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

**4. Describe the two major changes in the code.**.    
 

**3.  How many functions in duckchain.js?**.    
Seven.     

**4.  What are the functions in duckchain.js?**.         
Two constructor functions for the classes (Block and Blockchain).    
The other functions are:        
calculateHash.      
createGenesisBlock.         
getLatestBlock.    
addBlock.     
isChainValid.     

**5.  Run the code**.     
`node duckchain.js`.    

**6.  Cut and paste the output from the run.**
```
barrymosakowski@barrymosakow-mac Duckchain % node duckchain.js
{
    "chain": [
        {
            "index": 0,
            "data": "Genesis Block Quack Quack!",
            "hash": "fc2193068c46fa6568886afcf5835030a1db99abc1faad2205f864e191f0c839",
            "previousHash": "0"
        },
        {
            "index": 1,
            "data": "donald",
            "hash": "0b72f7611b4ad7c8c82dc8cc351bd7ecd0fe5ca58629087b9a89fe2144fd1f8d",
            "previousHash": "fc2193068c46fa6568886afcf5835030a1db99abc1faad2205f864e191f0c839"
        },
        {
            "index": 2,
            "data": "daffy",
            "hash": "ac76324eabe385711b526e40a2ca4b6d8f7b2fd93c5b5fd90880eac9ef7169ba",
            "previousHash": "0b72f7611b4ad7c8c82dc8cc351bd7ecd0fe5ca58629087b9a89fe2144fd1f8d"
        }
    ]
}
Is the Duckchain valid? true
OK, let us do some hacking!
Invalid previousHash - Block #2
Is the Duckchain valid? false
barrymosakowski@barrymosakow-mac Duckchain %
```
     

 **7.  Explain in words and show the lines of code that caught the hack of our blockchain**.    
 The code in duckchain.js modified the the block for index 1.   It changed the data and then recalculated the hash.  
```
duckchain.chain[1].data = "howard";
duckchain.chain[1].hash = duckchain.chain[1].calculateHash();
```
      
This is the heart and soul of blockhain! 

How this was caught was using the function isChainValid().  And the reason is Block 2 had a value for the previousHash that it saved when the block was created.  This value should always match the hash of the previous block.  If it does not that indicates the block was changed.  Here is the code that caught the failure:
```
            // check previous blocks hasn't changed too
            if (currentBlock.previousHash !== previousBlock.hash) {   
                console.log('Invalid previousHash - Block #' + currentBlock.index);
                return false;   // nope - the block has be


