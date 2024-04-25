// CMD
// truffle exec test/SpentTest.js
const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();
    console.log('Deployed contract instance address:', instance.address);

    // USER SET DATA
    const SENDER_ADDRESS = "0x7Bbc55b227949DF9c100Ed882172C3766cB9f013"; 
    
    
    // Get the spent amount for the specified address
    const spentAmount = await instance.checkSpentAmount(SENDER_ADDRESS);

    // Convert the amount from wei to ether and log it
    const spentInEther = web3.utils.fromWei(spentAmount.toString(), "ether");
    console.log(`Total amount spent by ${SENDER_ADDRESS}: ${spentInEther} ETH`);

    callback(); // End the script
  } catch (error) {
    console.error("An error occurred while checking the spent amount:", error);
    callback(error); // End with an error
  }
};
