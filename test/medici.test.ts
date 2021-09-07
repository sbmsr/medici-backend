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

  it("Should persist prices and owner on upgrade", async function () {
    fail("Needs to be implemented.");
  });
});
