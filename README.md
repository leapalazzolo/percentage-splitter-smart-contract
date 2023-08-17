[![Test Contract](https://github.com/leapalazzolo/percentage-splitter-smart-contract/actions/workflows/test.yaml/badge.svg)](https://github.com/leapalazzolo/percentage-splitter-smart-contract/actions/workflows/test.yaml)

# Percentage Splitter Smart Contract

This repository contains a Solidity smart contract that implements a percentage splitter. The contract allows you to split incoming funds between an owner and a receiver based on specified percentages.

## Features

- Split incoming funds between owner and receiver based on percentages.
- Update the receiver's address.
- Built using Solidity and OpenZeppelin for ownership management.

## Getting Started

Follow these steps to get started with the smart contract:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:leapalazzolo/percentage-splitter-smart-contract.git
   cd percentage-splitter
   ```

2. **Install Dependencies:**

   Make sure you have Node.js and npm installed. Then, install the required dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   make install
   ```

3. **Compile Contracts:**

   Compile the Solidity contracts using Hardhat:

   ```bash
   npx hardhat compile
   ```

   or

   ```bash
   make compile
   ```

4. **Run Tests:**

   Test the contract functionalities using Hardhat:

   ```bash
   npx hardhat test
   ```

   or

   ```bash
   make test
   ```

5. **Deploy and Interact:**

   You can deploy the contract on your desired Ethereum network using Hardhat. Update the network configuration in `hardhat.config.js` and use the deploy script as needed. The networks by default are: Ethereum mainnet, Goerli, Sepolia, Polygon mainnet and Mumbai.

   Define the percentage as an integer value using 100 as a denominator. For example, 3 represents 3%.

   ```bash
   make deploy NETWORK=define_a_network_here FEE_ADDRESS=address FEE_PERCENTAGE=percentage
   ```

6. **Verify the contract:**

   You can verify the contract on your desired Ethereum network using Hardhat. Update the network configuration in `hardhat.config.js` and use the deploy script as needed. The networks by default are: Ethereum mainnet, Goerli, Sepolia, Polygon mainnet and Mumbai.

   ```bash
   make deploy NETWORK=define_a_network_here FEE_ADDRESS=previous_fee_address FEE_PERCENTAGE=previous_fee_percentage
   ```

## Contract Details

The contract is deployed with an initial receiver address and fee percentage. You can split incoming funds between the owner and the receiver by calling the `split` function.

- `split(address payable _receiver)`: Splits the incoming funds between the owner and the receiver based on percentages. The receiver's percentage is (100 - owner's percentage).

- `updateFeeAddress(address _feeAddress)`: Updates the owner's address.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to contribute, open issues, and create pull requests. If you have any questions, reach out to [leapalazzolo@gmail.com](mailto:leapalazzolo@gmail.com).
