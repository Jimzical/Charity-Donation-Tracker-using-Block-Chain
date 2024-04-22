// CMD to run the script
// truffle exec test/Donate.js
const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
    let instance = await DonationTracker.deployed();
    let accounts = await web3.eth.getAccounts();

    const CHARITY = "UNICEF";
    const AMOUNT = "1";
    // Donate
    let response = await instance.Donate(`${CHARITY}`, web3.utils.toWei(`${AMOUNT}`, "ether"), { from: accounts[0] });

    const logs = response.logs;
    const donationMadeLog = logs.find(log => log.event === 'DonationMade');

    if (donationMadeLog) {
        console.log(`Sender: ${donationMadeLog.args.sender}`);
        console.log(`Receiver: ${donationMadeLog.args.receiver}`);
        console.log(`Amount: ${web3.utils.fromWei(donationMadeLog.args.amount, 'ether')} ETH`);
        console.log(`Timestamp: ${donationMadeLog.args.timestamp}`);
    } else {
        console.log('No DonationMade event found');
    }
    callback();
};