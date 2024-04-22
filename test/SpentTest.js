// CMD
// truffle exec test/SpentTest.js
const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();
    console.log('Deployed contract instance address:', instance.address);

    // USER SET DATA
    const SENDER_ADDRESS = "0x176BC1FCd30140a158D8E50b64f3dCd6183cef3D"; // Replace with a valid Ethereum address
    
    // Get the spent amount for the specified address
    const spentAmount = await instance.checkSpentAmount(SENDER_ADDRESS);
    console.log('Spent amount:', spentAmount.toString(), 'wei; ', web3.utils.fromWei(spentAmount.toString(), 'ether'), 'ETH');

    // Convert the amount from wei to ether and log it
    const spentInEther = web3.utils.fromWei(spentAmount.toString(), "ether");
    console.log(`Total amount spent by ${SENDER_ADDRESS}: ${spentInEther} ETH`);

    callback(); // End the script
  } catch (error) {
    console.error("An error occurred while checking the spent amount:", error);
    callback(error); // End with an error
  }
};
