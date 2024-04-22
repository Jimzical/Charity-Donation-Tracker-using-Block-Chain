const DonationTracker = artifacts.require("DonationTracker");

contract("DonationTracker", (accounts) => {
  it("should donate correctly", async () => {
    const instance = await DonationTracker.deployed();

    // Donate 1 ether from accounts[0] to "UNICEF"
    await instance.Donate("UNICEF", web3.utils.toWei("1", "ether"), {from: accounts[0]});

    // Check the received amount for "UNICEF"
    const receivedAmount = await instance.checkReceivedAmount("UNICEF");
    assert.equal(receivedAmount.toString(), web3.utils.toWei("1", "ether"), "The received amount was not correct");
  });
});