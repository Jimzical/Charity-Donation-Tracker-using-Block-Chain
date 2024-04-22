// CMD to run the script
// truffle exec test/CheckReceivedAmount.js 

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function(callback) {
  let instance = await DonationTracker.deployed();

  // Hardcode receiver
  const RECEIVER = "UNICEF";

  // Check received amount
  let receivedAmount = await instance.checkReceivedAmount(RECEIVER);
  console.log(`Received amount by ${RECEIVER}: ${web3.utils.fromWei(receivedAmount.toString(), "ether")} ETH`);
  
  callback();
};
