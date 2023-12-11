const { ethers} = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

    const V1 = await ethers.getContractFactory('V1');
    const V2 = await ethers.getContractFactory('V2');
    const ERC1967Proxy = await ethers.getContractFactory('UUPSProxy');

    const impl = await V1.deploy();
    await impl.waitForDeployment();
    const proxy = await ERC1967Proxy.deploy( 
        await impl.getAddress(),
        V2.interface.encodeFunctionData('initialize', [deployer.address]),
    );
    await proxy.waitForDeployment();

    let implementationAddress = await impl.getAddress();
    let proxyAddress = await proxy.getAddress();

    console.log(`implementation address: ${ implementationAddress }`);
    console.log(`proxy address: ${ proxyAddress }`);    

    let proxyPointer = impl.attach(proxyAddress);
    let tx = await proxyPointer.inc();
    tx = await proxyPointer.inc();
    await tx.wait();
    let counter = await proxyPointer.counter();
    console.log(`current counter val: ${counter}`);

    const impl2 = await V2.deploy();
    await impl2.waitForDeployment();

    implementationAddress = await impl2.getAddress(); 
    console.log(`implementation2 address: ${ implementationAddress }`);

    tx = await proxyPointer.upgradeToAndCall(implementationAddress,'0x', {value: 0} );
    await tx.wait();

    proxyPointer = impl2.attach(proxyAddress);
    tx = await proxyPointer.decrease();
    await tx.wait();
    counter = await proxyPointer.counter();
    console.log(`current counter val after decrease: ${counter}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });