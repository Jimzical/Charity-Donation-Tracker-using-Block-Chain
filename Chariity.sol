// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract DonationTracker {
    // basic structure to store donation details
    struct Donation {
        address donor;
        string receiverName;
        uint256 amount;
        uint256 timestamp;
    }

    // to keep track of total donations received by each receiver
    mapping(string => uint256) public totalReceivedByReceiver;

    // to store all donations made
    Donation[] public donationsDataArray;

    // event to log donation made wwith details
    event DonationMade(address indexed donor, string receiverName, uint256 amount);

    function makeDonation(string memory _receiverName) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        totalReceivedByReceiver[_receiverName] += msg.value;
        donationsDataArray.push(Donation(msg.sender, _receiverName, msg.value, block.timestamp));

        emit DonationMade(msg.sender, _receiverName, msg.value);
    }

    function getTotalReceivedByReceiver(string memory _receiverName) public view returns (uint256) {
        return totalReceivedByReceiver[_receiverName];
    }
}