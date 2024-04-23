// CMD
// truffle exec test/ReceivedTest.js

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();
    console.log('Deployed contract instance address:', instance.address);

    // USER SET DATA
    const RECEIVER_ADDRESS = "0x2b03c9f55C6eB876abA9CE66DB08c0d9dCe53928"; // Replace with a valid Ethereum address
    
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