import { fail } from "assert";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Medici } from "../typechain/index";

describe("Medici", function () {
  let Medici: Medici;
  let inventory = [{ id: "1", price: ethers.utils.parseUnits(".01", "ether") }];

  this.beforeEach(async function () {
    let MediciFactory = await ethers.getContractFactory("Medici");
    let mediciProxy = await upgrades.deployProxy(MediciFactory, [inventory]);
    Medici = (await mediciProxy.deployed()) as Medici;
  });

  it("Should be constructed with the correct inventory and owner", async function () {
    let ownerAddress = (await ethers.getSigners())[0].address;
    expect(await Medici.owner()).to.equal(ownerAddress);
    expect((await Medici.inventory("1")).price).to.equal(inventory[0].price);
  });

  it("should prevent purchase with incorrect amounts", async function () {
    await expect(Medici.attemptPurchase(["1"], { value: ethers.utils.parseUnits("1", "ether") })).to.be.revertedWith(
      "Incorrect payment amount"
    );
    await expect(Medici.attemptPurchase(["1"], { value: ethers.utils.parseUnits(".001", "ether") })).to.be.revertedWith(
      "Incorrect payment amount"
    );
  });

  it("should emit event on successful purchase", async function () {
    let address = (await ethers.getSigners())[0].address;
    await expect(Medici.attemptPurchase(["1"], { value: ethers.utils.parseUnits(".01", "ether") }))
      .to.emit(Medici, "paymentSuccessful")
      .withArgs(address, ["1"]);
  });

  it("should add new inventory successfully", async function () {
    const newProduct = { id: "2", price: ethers.utils.parseUnits(".01", "ether") };
    await Medici.updateInventory([newProduct]);
    expect((await Medici.inventory(newProduct.id)).price).to.equal(newProduct.price);
  });

  it("should update existing inventory successfully", async function () {
    const updatedProduct = { id: "1", price: ethers.utils.parseUnits(".02", "ether") };
    await Medici.updateInventory([updatedProduct]);
    expect((await Medici.inventory(updatedProduct.id)).price).to.equal(updatedProduct.price);
  });

  it("Should persist prices and owner on upgrade", async function () {
    fail("Needs to be implemented.");
  });
});
