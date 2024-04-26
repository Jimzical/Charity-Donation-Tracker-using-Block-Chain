// This script is used to make a donation to the DonationTracker contract
// CMD
// truffle exec test/DonateTest.js

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();

    // USER SET DATA  
    const sender = "0xDCDd1cAa7B04a1a29085Aa1532706c6e3f96ce32";
    const RECEIVER = "0x5D7eD77fd847388e051Cf5b283b5136a8f9B0021"; 
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