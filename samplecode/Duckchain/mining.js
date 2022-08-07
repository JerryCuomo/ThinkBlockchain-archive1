const SHA256 = require('crypto-js/sha256');

// This class defines a Block object destined for a Blockchain
class Block {

    // method that creates a new Block
    constructor(index, data) {   

        // A Block on the "Duckchain" contains these properties
        this.index = index;                 // position of block in the chain 
        this.data  = data;                  // data stored in the block
        this.nonce = 0;                     // used to add variety to hash calc (based on difficulty)
        this.hash  = this.calculateHash();  // calculate a hash for this block
        this.previousHash= 0;               // the hash of the previous block is calculated with all new blocks
    }

    // method that calculates the hash of a block
    // by applying a SHA256 hash function across block properties
    calculateHash() {
        let newHash = SHA256(this.index +     // include the index 
            JSON.stringify(this.data)   +     // all the data 
            this.nonce                  +     // include the nonce too
            this.previousHash);               // and the previous hash
        return(newHash.toString());           // returns a 64-character hash
    }       

    // method to mine a new block by repeatedly calculating a new hash
    // until the hash string starts with several "000" that match difficulty
    // if no match found, increment the nonce which changes block content
    // that ensures new hash calculation will differ from previous
    mineBlock(difficulty) {
        console.log("mining block.."+difficulty);
        while (this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;  
            this.hash = this.calculateHash();
        }
    }
}

// This class defines a blockchain object
class Blockchain {

    // method that creates a new blockchain
    // initializes the blockchain as array of blocks
    constructor() {
        this.chain = [this.createGenesisBlock()]; // 'chain' is the blockchain
                                                  // starting with genesis block
        this.difficulty = 1;
    }                                             

    // method that creates block 0 aka the genesis block
    createGenesisBlock() {
        let genesisData = "Genesis Block Quack Quack!"; 
        let genesisBlock = new Block(0,           // the index is zero because its block 0 
                                    genesisData); // data for the genesis block 
        return(genesisBlock);
    }

    // fetches the last block added to the chain
    getLatestBlock() {
      //let last = this.chain.length - 1; // calculate last item in the chain
      //let lastBlock = this.chain[last]; // get the last block
      //return(lastBlock);                // return the last block
      return(this.chain[this.chain.length-1]);
    }

    // adds a new block on to the chain
    addBlock(newBlock) {
        // fetch the hash of last block
        newBlock.previousHash = this.getLatestBlock().hash; 
        // calc has of this new block
        newBlock.mineBlock(this.difficulty);
        // add the new block to chain          
        this.chain.push(newBlock);                          
    }

    // this method checks the integrity of the chain by checking the validity
    // of the blocks hash and the current and previous block's hashes match
    // return true if all checks out, otherwise false
    isChainValid() {
        // iterate through all block on the chain 
        for (let i=1; i < this.chain.length; i++) {  
            const currentBlock  = this.chain[i];     // get the current block  
            const previousBlock = this.chain[i - 1]; // get the previous block
            
            // check hash is correct by recalculating
            if (currentBlock.hash !== currentBlock.calculateHash()) {  
                console.log('Invalid hash - Block #' + currentBlock.index);
                return false;   // nope - the block has been tampered with
            }

            // check previous blocks hasn't changed too
            if (currentBlock.previousHash !== previousBlock.hash) {   
                console.log('Invalid previousHash - Block #' + currentBlock.index);
                return false;   // nope - the block has been tampered with
            }
        }
        return true;  // we made it... everything checks out!
    }
}

// create and test the Duckchain
let duckchain = new Blockchain(); // Tada! duckchain is live on my laptop 

duckchain.difficulty = 3;
duckchain.addBlock(new Block(1, "donald"));  // add the donald block
 
duckchain.difficulty = 6;
duckchain.addBlock(new Block(2, "daffy" ));  // add the daffy block

// print out the full duckchain
console.log(JSON.stringify(duckchain, null, 2));          
// print out if chain is valid or not
console.log('Is the Duckchain valid? ' + duckchain.isChainValid());
