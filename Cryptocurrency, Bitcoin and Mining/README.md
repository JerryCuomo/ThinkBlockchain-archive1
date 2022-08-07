# Cryptocurrency, Bitcoin and Mining    

## Let's review the code then run it!

**Please submit a PR with your answers.  Your answers should be added to this README.md file.** 

**1.  Go into the sampecode directory**.    
`cd samplecode/Duckchain`.    
 and open the `mining.js` file with your editor of choice.      

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


