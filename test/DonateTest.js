// CMD to run the script
// truffle test test/DonateTest.js.
const DonationTracker = artifacts.require("DonationTracker");

contract("DonationTracker", accounts => {
    let donationTracker = null;
    const sender = accounts[0];
    const receiver = "UNICEF";
    const amount = web3.utils.toWei('1', 'ether');

    before(async () => {
        donationTracker = await DonationTracker.deployed();
    });

    it("should make a donation and emit an event", async () => {
        // Make a donation
        const response = await donationTracker.Donate(receiver, amount, { from: sender });

        // Check the logs
        const logs = response.logs;
        const donationMadeLog = logs.find(log => log.event === 'DonationMade');

        assert(donationMadeLog, 'No DonationMade event found');

        // Check the event arguments
        assert.equal(donationMadeLog.args.sender, sender, 'Sender is not correct');
        assert.equal(donationMadeLog.args.receiver, receiver, 'Receiver is not correct');
        assert.equal(donationMadeLog.args.amount, amount, 'Amount is not correct');
    });
});