# How Blockchain Works

## Questions submitted by bmos

## Let's review the code then run it!

Go into the sampecode directory and open the duckchain.js code in a new tab on your browser. Keep this tab open!   
[duckchain.js](https://github.com/JerryCuomo/ThinkBlockchain/blob/main/samplecode/Duckchain/duckchain.js) 
    
 
**1.  How many classes do you see?**.    
Two.

**2.  What are the classes?**.    
Block and Blockchain

**3.  How many functions in duckchain.js?**.    
Seven.     

**4.  What are the functions in duckchain.js?**.         
Two constructor functions for the classes (1 in class Block and 1 in class Blockchain).    
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

## Questions submitted by @JerryCuomo

### Question 1
#### Duckchain.js defines two classes, which are:

a. calculateHash and createGenesisBlock
b. Block and Blockchain
c. donald and howard
d. getLastBlock and isChainValid

### Question 2
#### Which best describes the two "hash" fields in the Block class

a. this.hash is the hash of the block 
b. this.previousHash is the has of the last block issued
c. this.previousHash equal zero if the previous block is the genesis block
d. All of the above

### Question 3
#### What are the two conditions that need to be true for the blockchain needs to be valid?

a. The first test involves recalculating the Block’s hash and comparing it to the hash value currently set for the Block. The second test is to check that the hash of this Block’s previous hash value is actually equal to the previous Block’s hash value.

b. The first test involves recalculating the Genesis Block's hash and comparing it to the hash value currently set for the Block. The second test is to check that the hash of this Block’s previous hash value is actually equal to the previous Block’s hash value.

### Question 4

#### In the Duckchain sample, the test code tries to tamper with the first block in the Duckchain, changing the data field from Donald to Howard. We try to mask this devious task by also recalculating the hash for this block thinking that perhaps no one will notice. Does this trick make the Duckchain valid again?

##### Select one:
True
False



