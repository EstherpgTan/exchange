async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("Token")
    const token = await Token.deploy("Bitcoin", "BTC", "1000000")
    return { token }
}

module.exports = {
    deployTokenFixture
}