//CMD
// truffle exec test/getDonationTest.js

const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
  try {
    // Retrieve the deployed contract instance
    const instance = await DonationTracker.deployed();

    // Get the list of all donations
    const donations = await instance.getDonations();

    console.log(`Total Donations: ${donations.length}\n`);

    // Loop through the donations array and display each donation with clear formatting
    donations.forEach((donation, index) => {
      const sender = donation.sender;
      const receiver = donation.receiver;
      const amountInWei = donation.amount;
      const amountInEth = web3.utils.fromWei(amountInWei.toString(), "ether");
      const timestamp = new Date(donation.timestamp * 1000).toLocaleString(); // Convert timestamp to human-readable date

      console.log(`Donation ${index + 1}:`);
      console.log(`  Sender:    ${sender}`);
      console.log(`  Receiver:  ${receiver}`);
      console.log(`  Amount:    ${amountInEth} ETH`);
      console.log(`  Timestamp: ${timestamp}\n`);
    });

    callback(); // End the script
  } catch (error) {
    console.error("An error occurred while fetching the donations:", error);
    callback(error); // End with an error
  }
};
