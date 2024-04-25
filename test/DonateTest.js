// This script is used to make a donation to the DonationTracker contract
// CMD
// truffle exec test/DonateTest.js

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();

    // USER SET DATA  
    const sender = "0x7Bbc55b227949DF9c100Ed882172C3766cB9f013";
    const RECEIVER = "0x937a8628cAc1d6Bf6Ac6B39c19db5677b00deF1A"; 
    const AMOUNT = "1";

    // Define the donation amount in wei (1 ether = 10^18 wei)
    const DONATION_AMOUNT = web3.utils.toWei(`${AMOUNT}`, "ether"); 
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