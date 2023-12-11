# UUPS proxy custom implementation using openzeppelin v5

This project demonstrates a basic manual script to see how a universally upgradeable proxy smart contract works. The proxy contract uses ERC1967 standard where the updateImplementation() function exists inside the implementation itself. There is no need to have an admin contract.

Configure your hardhatconfig.js file and try running:

```shell
npm i
npx hardhat run scripts/manualProxy/ManuallyDeployV1.js
```
