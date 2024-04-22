// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {
    struct Donation {
        address sender;
        string receiver;
        uint256 amount;
        uint256 timestamp;
    }

    // Array to store all donations
    Donation[] public donations;

    // Mapping to store total amount received by each receiver and spent by each sender
    mapping(string => uint256) public receivedAmounts;
    mapping(address => uint256) public spentAmounts;

    event DonationMade(address indexed sender, string receiver, uint256 amount, uint256 timestamp);

    modifier validDonation(string memory name, uint256 value) {
        require(bytes(name).length > 0, "Receiver's name cannot be empty");
        require(value > 0, "Donation amount must be greater than zero");
        require(msg.sender.balance >= value, "Sender does not have enough balance");
        _;
    }


    // TODO: Check this with node js later
    // function Donate(string memory name, uint256 value) public payable validDonation(name, value) {

        
    function Donate(string memory name, uint256 value) public  validDonation(name, value) {
        // Create a new donation object with the details received
        Donation memory newDonation = Donation({
            sender: msg.sender,
            receiver: name,
            amount: value,
            timestamp: block.timestamp
        });

        // Add donation to the array
        donations.push(newDonation);

        // Update the total amount received by the receiver and spent by the sender
        receivedAmounts[name] += value;
        spentAmounts[msg.sender] += value;

        // TODO: Check this with node js later
        // // Transfer the donation amount to the receiver
        // payable(address(receiver)).transfer(value);

        // Emit event with details of donation
        emit DonationMade(msg.sender, name, value, block.timestamp);
    }

    // Default function to check how much received by user/organization
    function checkReceivedAmount(string memory receiver) public view returns (uint256) {
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