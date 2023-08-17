import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, ContractFactory, Signer } from "ethers";

describe("Splitter", function () {
  let Splitter: ContractFactory;
  let splitter: Contract;
  let owner: Signer;
  let signer1: Signer;
  let signer2: Signer;

  const FEE_PERCENTAGE = 10;

  beforeEach(async () => {
    [owner, signer1, signer2] = await ethers.getSigners();

    Splitter = await ethers.getContractFactory("Splitter");
    splitter = await Splitter.deploy(owner.getAddress(), FEE_PERCENTAGE);
    await splitter.deployed();
  });

  it("should split funds correctly", async function () {
    const amount = ethers.utils.parseEther("1.0"); // 1 Ether

    const ownerBalance = await ethers.provider.getBalance(owner.getAddress());
    const receiver1Balance = await ethers.provider.getBalance(
      signer1.getAddress()
    );
    const receiver2Balance = await ethers.provider.getBalance(
      signer2.getAddress()
    );

    const tx = await splitter
      .connect(signer1)
      .split(signer2.getAddress(), { value: amount });

    const receipt = await tx.wait();

    const newOwnerBalance = await ethers.provider.getBalance(
      owner.getAddress()
    );
    const newReceiver1Balance = await ethers.provider.getBalance(
      signer1.getAddress()
    );
    const newReceiver2Balance = await ethers.provider.getBalance(
      signer2.getAddress()
    );

    const feeAmount = amount.mul(FEE_PERCENTAGE).div(100);
    const receiverAmount = amount.sub(feeAmount);
    const spentEtherInGas = receipt.gasUsed.mul(receipt.effectiveGasPrice);

    expect(newOwnerBalance).to.equal(ownerBalance.add(feeAmount));

    expect(newReceiver1Balance).to.equal(
      receiver1Balance.sub(amount.add(spentEtherInGas))
    );
    expect(newReceiver2Balance).to.equal(receiver2Balance.add(receiverAmount));
  });

  it("should not allow splitting to invalid receiver address", async function () {
    const amount = ethers.utils.parseEther("1.0"); // 1 Ether

    await expect(
      splitter
        .connect(owner)
        .split(ethers.constants.AddressZero, { value: amount })
    ).to.be.revertedWith("Invalid address");
  });

  it("should not allow splitting with zero value", async function () {
    await expect(
      splitter.connect(owner).split(signer2.getAddress(), { value: 0 })
    ).to.be.revertedWith("No value sent");
  });
  it("should update fee address correctly", async function () {
    const newFeeAddress = ethers.Wallet.createRandom().address;

    await splitter.connect(owner).updateFeeAddress(newFeeAddress);
    const updatedFeeAddress = await splitter.feeAddress();

    expect(updatedFeeAddress).to.equal(newFeeAddress);
  });

  it("should revert if non-owner tries to update fee address", async function () {
    await expect(
      splitter.connect(signer1).updateFeeAddress(signer1.getAddress())
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should revert if new fee address is invalid", async function () {
    await expect(
      splitter.connect(owner).updateFeeAddress(ethers.constants.AddressZero)
    ).to.be.revertedWith("Invalid address");
  });
});
