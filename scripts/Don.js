// scripts/Donate.js
const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();

    const sender = "0x176BC1FCd30140a158D8E50b64f3dCd6183cef3D";

    const RECEIVER = "0xEe2157a86F3DA0cA7d2fBBCFC629101e43158a55"; 

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