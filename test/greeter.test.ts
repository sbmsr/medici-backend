import { Contract, ContractFactory } from "@ethersproject/contracts";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("Greeter", function () {
  let Greeter: ContractFactory;
  let greeter: Contract;

  this.beforeEach(async function () {
    Greeter = await ethers.getContractFactory("Greeter");
    greeter = await upgrades.deployProxy(Greeter, ["Hello, world!"]);
    await greeter.deployed();
  });

  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("Should persist greeting on upgrade", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    await setGreetingTx.wait();

    let upgradedGreeting = await upgrades.upgradeProxy(greeter.address, Greeter);
    await upgradedGreeting.deployed();

    expect(upgradedGreeting.address).to.equal(greeter.address);
    expect(await upgradedGreeting.greet()).to.equal("Hola, mundo!");
  });
});
