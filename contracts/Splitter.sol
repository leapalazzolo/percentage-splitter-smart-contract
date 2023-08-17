// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Splitter is Ownable {
    uint256 public feePercentage;
    address public feeAddress;

    modifier validAddress(address _feeAddress) {
        require(_feeAddress != address(0), "Invalid address");
        _;
    }

    constructor(address _feeAddress, uint256 _feePercentage) {
        updateFeeAddress(_feeAddress);
        feePercentage = _feePercentage;
    }

    function split(
        address payable _receiver
    ) external payable validAddress(_receiver) {
        require(msg.value > 0, "No value sent");

        uint256 feeAmount = (msg.value * feePercentage) / 100;
        uint256 receiverAmount = (msg.value * (100 - feePercentage)) / 100;

        require(
            feeAmount + receiverAmount <= msg.value,
            "Percentage calculation error"
        );

        payable(feeAddress).transfer(feeAmount);
        _receiver.transfer(receiverAmount);
    }

    function updateFeeAddress(
        address _feeAddress
    ) public onlyOwner validAddress(_feeAddress) {
        feeAddress = _feeAddress;
    }
}
