// CMD to run the script
// truffle exec test/CheckSpentAmount.js 

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function(callback) {
  let instance = await DonationTracker.deployed();

  // Check received amount
  let receivedAmount = await instance.checkSpentAmount();
  console.log(`Amount Spent: ${web3.utils.fromWei(receivedAmount.toString(), "ether")} ETH`);
  
  callback();
};
