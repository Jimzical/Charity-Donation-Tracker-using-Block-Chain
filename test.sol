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
    mapping(string => uint256) public receivedAmounts;
    mapping(address => uint256) public spentAmounts;

    event DonationMade(address indexed sender, string receiver, uint256 amount, uint256 timestamp);

    function payPerson(string memory name, uint256 value) public {
        Donation memory newDonation = Donation({
            sender: msg.sender,
            receiver: name,
            amount: value,
            timestamp: block.timestamp
        });

        donations.push(newDonation);
        receivedAmounts[name] += value;
        spentAmounts[msg.sender] += value;

        emit DonationMade(msg.sender, name, value, block.timestamp);
    }

    function checkReceivedAmount(string memory receiver) public view returns (uint256) {
        return receivedAmounts[receiver];
    }
    
    function checkSpentAmount() public view returns (uint256) {
        return spentAmounts[msg.sender];
    }

    function checkSpentAmount(address sender) public view returns (uint256) {
        return spentAmounts[sender];
    }
}