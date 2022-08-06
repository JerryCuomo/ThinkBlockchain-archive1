# How Blockchain Works

## Let's review the code then run it!

**1.  Go into the sampecode directory**.    
`cd samplecode/Duckchain/duckchain.js`


**2.  How many classes do you see?**.    
Two.

**What are the classes?**.    
Block and Blockchain

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
     

 **7.  Explain in words and show the lines of code that failed after we hacked the code**.    
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
                return false;   // nope - the block has been tampered with
            }
```     

You can always add console.log's around this statement to prove the values do not match any longer.     

**8.  Add another block to the end of duckchain.js using your first and last name as the data and cut and paste the output here.  Also show the line of code you added**.

```
duckchain.addBlock(new Block(3, "barrymosakowski" ));

barrymosakowski@barrymosakow-mac Duckchain % node duckchain3.js
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
        },
        {
            "index": 3,
            "data": "barrymosakowski",
            "hash": "1c300e9f3d4847495561849f3006f0aa289a4a46e1dad984e3970ad63456992a",
            "previousHash": "ac76324eabe385711b526e40a2ca4b6d8f7b2fd93c5b5fd90880eac9ef7169ba"
        }
    ]
}
Is the Duckchain valid? true
```




 



     



