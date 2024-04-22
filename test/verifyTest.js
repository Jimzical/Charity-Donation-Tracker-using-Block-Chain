// CMD to run the script
// truffle test test/verifyTest.js
const DonationTracker = artifacts.require("DonationTracker");

contract("DonationTracker", accounts => {
    let donationTracker = null;
    const sender = accounts[0];
    const receiver = "UNICEF";
    const amount = web3.utils.toWei('1', 'ether');

    before(async () => {
        donationTracker = await DonationTracker.deployed();
    });

    it("should check if spent amount is less than or equal to received amount", async () => {
        // Make a donation
        await donationTracker.Donate(receiver, amount, { from: sender });

        // Check spent amount
        const spentAmount = await donationTracker.checkSpentAmount(sender);

        // Check received amount
        const receivedAmount = await donationTracker.checkReceivedAmount(receiver);

        assert.isTrue(web3.utils.toBN(spentAmount).lte(web3.utils.toBN(receivedAmount)));
    });
});