//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Medici is Initializable, OwnableUpgradeable{

    struct Product {
        string id; // UPC/SKU/etc.
        uint256 price; // Cost in Wei
    }

    uint public blockNumber;
    mapping(string => Product) public inventory;

    function initialize(Product[] memory products) public initializer {
        __Ownable_init();
        blockNumber = block.number; // used as filter when calling .getPastEvents(...)
        for (uint i = 0; i < products.length; i++) {
            inventory[products[i].id] = products[i];
        }
    }

    event paymentSuccessful(address indexed from, string[] products);
    event cashOutSuccessful(address indexed to, uint256 amount);

    function attemptPurchase(string[] memory productIds) external payable {
        uint256 total = 0;
        for (uint i = 0; i < productIds.length; i++) {
            total += inventory[productIds[i]].price;
        }
        require(msg.value == total, "Incorrect payment amount");
        emit paymentSuccessful(msg.sender, productIds);
    }

    function updateInventory(Product[] memory products) external onlyOwner {
        for (uint i = 0; i < products.length; i++) {
            inventory[products[i].id] = products[i];
        }
    }
    
    function cashOut(uint256 amount) external onlyOwner {
        require(amount < address(this).balance, "Not enough funds for cash out"); 
        payable(owner()).transfer(amount);
        emit cashOutSuccessful(owner(), amount);
    }
}
