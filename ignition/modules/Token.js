const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModule", (m) => {
    // Provide the constructor arguments: name and symbol
    const token = m.contract("Token", ["MyToken", "MTK"]);

    return { token };
});
