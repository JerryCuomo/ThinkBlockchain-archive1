pragma solidity ^0.8.4; // SPDX-License-Identifier: MIT

// The ERC-20 spec is implemented in ERC20.sol, by importing
// it, we save are avoiding duplicating great deal of code here
// This is for demo purposes only!
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// DuckToken is meant to be a very simple example of an ERC20 token.
// In the example all tokens are pre-assigned to the creator.
// Can later distribute these tokens using `transfer` and other ERC20 functions

contract DuckToken is ERC20 {

    // "super constructor" for DuckToken, which calls on ERC20 contructor
    // passing in token name   = "Duck Token" and symbol = "DUCK";

    constructor() ERC20("Duck Token", "DUCK") {
       
        // Mints 1,000 tokens to your wallet's address
        _mint(msg.sender, 1000); 
     }
    // so much more can be done here.
}