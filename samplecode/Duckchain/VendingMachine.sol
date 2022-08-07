pragma solidity 0.8.7;

// contract that enforces "money + snack selection = snack dispensed"
contract VendingMachine {

    // Declare state variables of the contract

    // owner of the vending machine
    address public owner;    

    // account balances of candybar buyers
    mapping (address => uint) public candybarBalances;  

    // When 'VendingMachine' contract is deployed:
    // 1. set deploying address as owner of contract/vendingmachine
    // 2. set deployed smart contract's candybar balance to 100
    constructor() {
        owner = msg.sender;                          

        candybarBalances[address(this)] = 100;         
    }

    // Allow the owner to increase the smart contract's candybar balance
    function refill(uint amount) public {

        require(msg.sender == owner, "Only the owner can refill.");

        // adds more candybars to owners balance
        candybarBalances[address(this)] += amount;   
    }

    // Allow anyone to purchase candybars
    // To purchase, you must pay a least 1 ETH (expensive!)
    // To purchase, there must be bars in stock from owner account
    // If the above conditions are met.. we debit owner and credit buyer
    function purchase(uint amount) public payable {

        require(msg.value >= amount * 1 ether,
                            "You must pay at least 1 ETH per candybar");

        require(candybarBalances[address(this)] >= amount, 
                            "Not enough candybars in stock to complete this purchase");

        // debit owners' account
        candybarBalances[address(this)] -= amount; 

        // add new user to candybar balance list
        candybarBalances[msg.sender] += amount;    
    }
}