// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {
    struct Donation {
        address sender;
        address receiver; // Change this from string to address
        uint256 amount;
        uint256 timestamp;
    }

    // Array to store all donations
    Donation[] public donations;

    // Mapping to store total amount received by each receiver and spent by each sender
    mapping(address => uint256) public receivedAmounts; // Change key from string to address
    mapping(address => uint256) public spentAmounts;

    event DonationMade(address indexed sender, address indexed receiver, uint256 amount, uint256 timestamp); // Change receiver from string to address

    modifier validDonation(address receiver, uint256 value) { // Change name to receiver
        require(receiver != address(0), "Receiver's address cannot be empty");
        require(value > 0, "Donation amount must be greater than zero");
        require(msg.sender.balance >= value, "Sender does not have enough balance");
        _;
    }

    function Donate(address receiver, uint256 value) public payable validDonation(receiver, value) { // Change name to receiver
        // Create a new donation object with the details received
        Donation memory newDonation = Donation({
            sender: msg.sender,
            receiver: receiver, // Change name to receiver
            amount: value,
            timestamp: block.timestamp
        });

        // Add donation to the array
        donations.push(newDonation);

        // Update the total amount received by the receiver and spent by the sender
        receivedAmounts[receiver] += value; // Change name to receiver
        spentAmounts[msg.sender] += value;

        // Transfer the donation amount to the receiver
        payable(receiver).transfer(value); // Change address(this) to receiver

        // Emit event with details of donation
        emit DonationMade(msg.sender, receiver, value, block.timestamp); // Change name to receiver
    }

    // Default function to check how much received by user/organization
    function checkReceivedAmount(address receiver) public view returns (uint256) { // Change receiver from string to address
        return receivedAmounts[receiver];
    }

    // Default function to check how much spent by user
    function checkSpentAmount() public view returns (uint256) {
        return spentAmounts[msg.sender];
    }

    // Function to check how much spent by specific user/organization
    function checkSpentAmount(address sender) public view returns (uint256) {
        return spentAmounts[sender];
    }
}