// CMD to run the script
// truffle exec test/CheckSpentAmount.js 

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function(callback) {
  let instance = await DonationTracker.deployed();

  // Hardcode the address you want to check
//   const ADDRESS = '0xYourAddressHere';
  const ADDRESS = '';

  if (ADDRESS === '') {
    let spentAmount = await instance.checkSpentAmount();
    console.log(`Amount Spent: ${web3.utils.fromWei(spentAmount.toString(), "ether")} ETH`);
    callback();
    return;
  }
  else {
      // Check spent amount
      let spentAmount = await instance.checkSpentAmount(ADDRESS);
      console.log(`Amount Spent by ${ADDRESS}: ${web3.utils.fromWei(spentAmount.toString(), "ether")} ETH`);
      
      callback();

  }

};