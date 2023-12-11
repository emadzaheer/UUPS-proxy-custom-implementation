const { ethers, upgrades } = require('hardhat');

async function main() {
  
  const Proxy = "0x2690eA766278095D11B4D668F6bB83Ad9692cb95";

  const [deployer] = await ethers.getSigners();

  const V2 = await ethers.getContractFactory("V2");
  const v1 = await upgrades.upgradeProxy(Proxy, V2, {kind: 'uups'}); 
  

  console.log( `v2 upgraded `);
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
