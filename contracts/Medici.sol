//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Medici is Initializable, OwnableUpgradeable{
    uint public blockNumber;
    uint256 public price;

    function initialize(uint256 p) public initializer {
        __Ownable_init();
        blockNumber = block.number;
        price = p; 
    }

    event paymentSuccessful(address);

    // Accept any incoming amount
    function attemptPurchase() external payable {
        require(msg.value >= .01 ether, "Incorrect payment amount");
        emit paymentSuccessful(msg.sender);
    }
    
    function destroy() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
