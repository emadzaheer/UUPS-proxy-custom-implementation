const { ethers, upgrades } = require('hardhat');



async function main() {
    const Proxy = "0xa0AC8a82cF6FFf2650570328140E720139A3341c";

    const V1 = await ethers.getContractFactory("V1")
    const [owner] = await ethers.getSigners()
    const tx = await V1.attach(Proxy).version1();
    await tx.wait(5);
    console.log(`version value: ${await V1.attach(Proxy).version()}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });