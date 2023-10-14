const {ethers} = require("hardhat");
const {expect} = require("chai");
const assert = require('assert');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');

describe("BuyMeACoffee", function() {
    async function deployContractAndSetVariables() {
        const factory = await ethers.getContractFactory("BuyMeACoffee");
        const contract = await factory.deploy();
        
        const [owner, signer1, signer2] = await ethers.getSigners();

        return {contract, owner, signer1, signer2};
    }

    it("Should set the contract deployer as contract owner", async () => {
        const {contract, owner} = await loadFixture(deployContractAndSetVariables);
        expect(await contract.owner()).to.equal(owner.address);
    });

    it("Contract balance should increase with the amount send by someone", async () => {
        const {contract, signer1, signer2} = await loadFixture(deployContractAndSetVariables);
        // signer1 balance before tipping should be 1000 ETH
        assert(await ethers.provider.getBalance(signer1.address) == 10000 * 1e18);

        const txn = await contract.connect(signer1).buyACoffee("Tudor", "Multam!", { value: ethers.parseEther("1") });
        await txn.wait();

        //signer1 balance after tipping 1 ETH
        const newBalance = await ethers.provider.getBalance(signer1.address);
        const delta = BigInt(0.5 * 1e18); // we have to consider a delta because of the amount of wei that is lost at a txn
        expect(newBalance).to.be.approximately(BigInt(9999 * 1e18), delta);

        // the contract's balance should be 1 ETH
        expect(await ethers.provider.getBalance(contract.target)).to.equal(BigInt(1e18));

        // signer2
        const txn2 = await contract.connect(signer2).buyACoffee("Gogu", "Te pup pe portofel!", { value: ethers.parseEther("3") });
        await txn2.wait();

        // the second tip should be sent by the signer2 address
        const addr = await contract.getNoteSender(1);
        expect(addr).to.equal(signer2.address)

        // the contract's balance should be 4 ETH
        expect(await ethers.provider.getBalance(contract.target)).to.equal(BigInt(4 * 1e18));
    });

    it("Should not let me buy a coffee for free", async () => {
        const {contract, signer1} = await loadFixture(deployContractAndSetVariables);
        await expect(contract.connect(signer1).buyACoffee("GOgu", "ceau boss")).to.be.revertedWith("You can't buy a coffe for free!");
    });

    it("Should let only the owner to withdraw the money", async () => {
        const {contract, owner, signer1} = await loadFixture(deployContractAndSetVariables);
        const tx = await contract.connect(signer1).buyACoffee("Tudor", "Multam!", { value: ethers.parseEther("3") });
        await tx.wait();

        // call by the owner
        const balanceBefore = await ethers.provider.getBalance(owner);

        const txn = await contract.connect(owner).withdrawTips();
        await txn.wait();

        const balanceAfter = await ethers.provider.getBalance(owner);

        expect(await ethers.provider.getBalance(contract.target)).to.equal(0);
        expect(BigInt(balanceAfter)).to.be.greaterThan(BigInt(balanceBefore));

        // call by an account other than the owner
        await expect(contract.connect(signer1).withdrawTips()).to.be.revertedWith("Only the owner can withdraw the money!");
    });
});
