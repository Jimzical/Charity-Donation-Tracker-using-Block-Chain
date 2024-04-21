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

    modifier validDonation(string memory name, uint256 value) {
        require(bytes(name).length > 0, "Receiver's name cannot be empty");
        require(value > 0, "Donation amount must be greater than zero");
        require(msg.sender.balance >= value, "Sender does not have enough balance");
        _;
    }

    function Donate(string memory name, uint256 value) public validDonation(name, value) {
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