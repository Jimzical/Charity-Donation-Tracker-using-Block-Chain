// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {
    struct Donation {
        address sender;
        address payable receiver;
        uint256 amount;
        uint256 timestamp;
    }

    // Array to store all donations
    Donation[] public donations;

    // Mapping to store total amount received by each receiver and spent by each sender
    mapping(address => uint256) public receivedAmounts;
    mapping(address => uint256) public spentAmounts;

    event DonationMade(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 timestamp
    );

  
    modifier validDonation(address payable receiver) {
        require(receiver != address(0), "Invalid receiver address");
        require(msg.value > 0, "Donation amount must be greater than zero");
        _;
    }

    function Donate(address payable receiver)
        public
        payable
        validDonation(receiver)
    {
        // Transfer the msg.value from the sender to the receiver
        receiver.transfer(msg.value);

        // Create a new donation object with the details received
        Donation memory newDonation = Donation({
            sender: msg.sender,
            receiver: receiver,
            amount: msg.value,
            timestamp: block.timestamp
        });

        // Add donation to the array
        donations.push(newDonation);

        // Update the total amount received by the receiver and spent by the sender
        receivedAmounts[receiver] += msg.value;
        spentAmounts[msg.sender] += msg.value;

        // Emit event with details of donation
        emit DonationMade(msg.sender, receiver, msg.value, block.timestamp);
    }
    
    // Default function to check how much received by an address
    function checkReceivedAmount(address receiver)
        public
        view
        returns (uint256)
    {
        return receivedAmounts[receiver];
    }

    // Default function to check how much spent by the caller
    function checkSpentAmount() public view returns (uint256) {
        return spentAmounts[msg.sender];
    }

    // Function to check how much spent by a specific address
    function checkSpentAmount(address sender) public view returns (uint256) {
        return spentAmounts[sender];
    }
}