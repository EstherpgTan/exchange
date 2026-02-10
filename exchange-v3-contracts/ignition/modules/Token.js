const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModule", (m) => {
    const TOTAL_SUPPLY = 1000000
    const DEPLOYER = m.getAccount(0)

    // Provide the constructor arguments: name and symbol
    const BTC = m.contract(
        "Token",
        ["Bitcoin", "BTC", TOTAL_SUPPLY],
        { from: DEPLOYER, id: "BTC" }
    );

    const mUSDC = m.contract(
        "Token",
        ["Mock USDC", "mUSDC", TOTAL_SUPPLY],
        { from: DEPLOYER, id: "mUSDC" }
    );

    const mTAO = m.contract(
        "Token",
        ["Mock TAO", "mTAO", TOTAL_SUPPLY],
        { from: DEPLOYER, id: "mTAO" }
    );

    return { BTC, mUSDC, mTAO };
});
