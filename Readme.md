# Mytest Contract Readme

This readme provides an overview of the testing setup and scenarios covered in the `Mytest` smart contract using the Hardhat framework and related plugins.

## Dependencies

Ensure that you have the required dependencies installed. You can use the following commands to install them:

```bash
npm install @nomicfoundation/hardhat-network-helpers
npm install @nomicfoundation/hardhat-chai-matchers
npm install chai
npm install ethers
```

## Overview

The `Mytest` contract is tested in three main sections: Deployment, Withdrawal, and Events.

### Deployment

#### Test: Unlocked Time
- Verifies that the unlocked time is correctly set during deployment.

#### Test: Owner
- Validates that the deployer is set as the owner of the contract.

#### Test: Receive and Store Funds
- Checks if the contract receives and stores the specified funds during deployment.

#### Test: Latest Time Check
- Ensures that deploying the contract with a time in the past results in a revert.

### Withdrawal

#### Validate
- Tests the withdrawal functionality, including checks for ownership, non-ownership, and successful withdrawal by the owner.

### Events

#### Test: Withdrawal Event
- Verifies that the `Withdrawal` event is emitted with the correct arguments when a withdrawal occurs.

## How to Run

1. Make sure you have Hardhat installed globally:

   ```bash
   npm install -g hardhat
   ```

2. Run the tests:

   ```bash
   npx hardhat test
   ```

## Test Fixtures

The `RunEveryTime` function is used as a test fixture to set up a consistent environment for each test case.

## Note

- The contract assumes that the `Mytest` contract is properly implemented, and these tests focus on its deployment, withdrawal, and event emission aspects.

- Ensure that the contract artifacts, such as the ABI and bytecode, are up-to-date.

Feel free to extend and modify these tests as needed based on your contract's specific requirements.