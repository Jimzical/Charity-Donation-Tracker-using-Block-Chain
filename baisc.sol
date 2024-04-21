// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {
    struct Donation {
        address sender;
        string receiver;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donations;

    event DonationMade(address indexed sender, string receiver, uint256 amount, uint256 timestamp);

    function payPerson(string memory name, uint256 value) public {
        Donation memory newDonation = Donation({
            sender: msg.sender,
            receiver: name,
            amount: value,
            timestamp: block.timestamp
        });

        donations.push(newDonation);

        emit DonationMade(msg.sender, name, value, block.timestamp);
    }
}