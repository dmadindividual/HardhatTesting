// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.19;

contract Mytest{
    uint256 public unlockedTime;
    address payable public owner;

    event Withdraw(uint256 amount, uint256 when);

    constructor(uint256 _unlockedTime) payable{
        require(block.timestamp < _unlockedTime, "Time is already passed");
        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);

    }

    function withdraw() public{
        require(block.timestamp >= unlockedTime, "Time is not yet passed");
        require(msg.sender == owner, "You are not the owner");
        emit Withdraw(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}