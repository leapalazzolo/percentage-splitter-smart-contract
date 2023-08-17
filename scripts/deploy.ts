import { ethers } from "hardhat";

async function main() {
  console.log("Starting deployment");
  const feeAddress = process.env.FEE_ADDRESS;
  const feePercentage = process.env.FEE_PERCENTAGE;

  if (feeAddress === undefined) {
    throw new Error("Missing FEE_ADDRESS variable");
  }

  if (feePercentage === undefined) {
    throw new Error("Missing FEE_PERCENTAGE variable");
  }

  const Splitter = await ethers.getContractFactory("Splitter");
  const splitter = await Splitter.deploy(feeAddress, feePercentage);

  await splitter.deployed();

  console.log("Splitter deployed to:", splitter.address);
  console.log(
    "Constructor arguments:",
    "FEE_ADDRESS",
    feeAddress,
    "FEE_PERCENTAGE",
    feePercentage
  );
  console.log("Deployment finished");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
