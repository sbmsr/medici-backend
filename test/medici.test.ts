import { fail } from "assert";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Medici } from "../typechain/index";

describe("Medici", function () {
  let Medici: Medici;

  this.beforeEach(async function () {
    let MediciFactory = await ethers.getContractFactory("Medici");
    let mediciProxy = await upgrades.deployProxy(MediciFactory, [ethers.utils.parseUnits(".01", "ether")]);
    Medici = (await mediciProxy.deployed()) as Medici;
  });

  it("Should be constructed with the correct price and owner", async function () {
    let ownerAddress = (await ethers.getSigners())[0].address;
    expect(await Medici.owner()).to.equal(ownerAddress);
    expect(await Medici.price()).to.equal(ethers.utils.parseUnits(".01", "ether"));
  });

  it("should prevent purchase with incorrect amounts", async function () {
    await expect(Medici.attemptPurchase({ value: ethers.utils.parseUnits("1", "ether") })).to.be.revertedWith(
      "Incorrect payment amount"
    );
    await expect(Medici.attemptPurchase({ value: ethers.utils.parseUnits(".001", "ether") })).to.be.revertedWith(
      "Incorrect payment amount"
    );
  });

  it("Should persist prices and owner on upgrade", async function () {
    fail("Needs to be implemented.");
  });
});
