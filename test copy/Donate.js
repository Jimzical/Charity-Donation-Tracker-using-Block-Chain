// CMD to run the script
// truffle exec test/Donate.js
const DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = async function (callback) {
    let instance = await DonationTracker.deployed();
    let accounts = await web3.eth.getAccounts();

    const CHARITY = accounts[1]; // Use the second account as the receiver
    const AMOUNT = "1";
    // Donate

    console.log('About to call Donate function');
    console.log(`CHARITY: ${CHARITY}`);
    console.log(`AMOUNT: ${AMOUNT}`);
    try {

        let response = await instance.Donate(CHARITY, web3.utils.toWei(`${AMOUNT}`, "ether"), { from: accounts[0], value: web3.utils.toWei(`${AMOUNT}`, "ether") });

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
    }
    catch (error) {
        console.log(error);
        callback(error);
    }
};