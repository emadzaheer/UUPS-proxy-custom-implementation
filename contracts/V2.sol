// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./V1.sol";

contract V2 is V1{
    function decrease() public {
        --counter;
    }
}