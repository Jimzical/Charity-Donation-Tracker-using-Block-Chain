// This script is used to make a donation to the DonationTracker contract
// CMD
// truffle exec test/DonateTest.js

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();

    // USER SET DATA  
    const sender = "0xfa37a056574C46b21922bf70E5dC5D0cA26CD7Ae";
    const RECEIVER = "0x99A5Bc41A7E31DBC4fa58479782ADF70cFd59822"; 
    const AMOUNT = "1";

    // Define the donation amount in wei (1 ether = 10^18 wei)
    const DONATION_AMOUNT = web3.utils.toWei(`${AMOUNT}`, "ether"); // Donate 0.5 Ether
    // Send the donation
    await instance.Donate(RECEIVER, { from: sender, value: DONATION_AMOUNT });

    console.log("Donation sent successfully!");
    console.log(`Sender: ${sender}\nReceiver: ${RECEIVER}\nAmount: ${AMOUNT} ETH`);

    
    callback(); // End the script
  } catch (error) {
    console.error("An error occurred while making the donation:", error);
    callback(error); // End with an error
  }
};