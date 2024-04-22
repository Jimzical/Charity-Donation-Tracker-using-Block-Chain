// scripts/CheckReceivedAmount.js
const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();
    console.log('Deployed contract instance address:', instance.address);

    // Address whose received amount we want to check
    const RECEIVER_ADDRESS = "0xEe2157a86F3DA0cA7d2fBBCFC629101e43158a55"; // Replace with a valid Ethereum address
    
    // Get the received amount for the specified address
    const receivedAmount = await instance.checkReceivedAmount(RECEIVER_ADDRESS);
    console.log('Received amount:', receivedAmount.toString(), 'wei; ', web3.utils.fromWei(receivedAmount.toString(), 'ether'), 'ETH');

    // Convert the amount from wei to ether and log it
    const receivedInEther = web3.utils.fromWei(receivedAmount.toString(), "ether");
    console.log(`Total amount received by ${RECEIVER_ADDRESS}: ${receivedInEther} ETH`);

    callback(); // End the script
  } catch (error) {
    console.error("An error occurred while checking the received amount:", error);
    callback(error); // End with an error
  }
};