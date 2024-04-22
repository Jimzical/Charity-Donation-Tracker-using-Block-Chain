var DonationTracker = artifacts.require("./DonationTracker.sol");

module.exports = function(deployer) {
  deployer.deploy(DonationTracker);
};