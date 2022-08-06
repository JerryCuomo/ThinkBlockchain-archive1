# How Blockchain Works

## Let's examine and run some code!

**Go into the sampecode directory**.    
`cd samplecode/Duckchain/duckchain.js`


**How many classes do you see?**.    
Two.

**What are the classes?**.    
Block and Blockchain

**How many functions in duckchain.js?**.    
Seven.     

**What are the functions in duckchain.js?**.         
Two constructor functions for the classes (Block and Blockchain).    
The other functions are:        
calculateHash.      
createGenesisBlock.         
getLatestBlock.    
addBlock.     
isChainValid.     

**Run the code**.     
`node duckchain.js`.    

**Cut and paste the output from the run.**
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


     



