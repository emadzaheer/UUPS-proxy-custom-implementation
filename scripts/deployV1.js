const { ethers, upgrades } = require('hardhat');

async function main() {
  
  const [deployer] = await ethers.getSigners();

  const V1 = await ethers.getContractFactory("V1");
  const V2 = await ethers.getContractFactory("V2");

  const v1 = await upgrades.deployProxy(V1, [deployer.address], {kind: 'uups'} ); 
  await v1.waitForDeployment();
  const proxyAddress = await v1.getAddress();
  console.log( `v1 deployed at : ${proxyAddress}`);
  
  let proxyPointer = V1.attach(proxyAddress);
  await proxyPointer.inc();
  await proxyPointer.inc();
  
  let counter = await proxyPointer.counter();
  console.log(`counter value with V1: ${ counter }`);
  
  const tx2 = await upgrades.upgradeProxy(proxyAddress, V2, {kind: 'uups'}); 

  proxyPointer = V2.attach(proxyAddress);
  tx = await proxyPointer.decrease();
  counter = await proxyPointer.counter();
  console.log(`counter value with V2: ${ counter }`);
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


