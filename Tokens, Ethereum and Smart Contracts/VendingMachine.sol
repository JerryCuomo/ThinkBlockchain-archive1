pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public candyBarBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's candyBar balance to 100
    constructor() {
        owner = msg.sender;
        candyBarBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's candyBar balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        candyBarBalances[address(this)] += amount;
    }

    // Allow anyone to purchase candyBars
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per candyBar");
        require(candyBarBalances[address(this)] >= amount, "Not enough candyBars in stock to complete this purchase");
        candyBarBalances[address(this)] -= amount;
        candyBarBalances[msg.sender] += amount;
    }
}
