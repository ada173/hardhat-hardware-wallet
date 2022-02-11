// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
// import { LedgerSigner } from "@ethersproject/hardware-wallets";
import { LedgerSigner } from "@anders-t/ethers-ledger";
import { formatEther } from "@ethersproject/units";


async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	// We get the contract to deploy
	console.log("------------- start ---------")
	let Greeter = await ethers.getContractFactory("Greeter");
	console.log("------------- get ledger signer ---------")
	// const ledger = new LedgerSigner();
	const ledger = new LedgerSigner();
	console.log("------------- log info ---------")
	console.log("deployer", await ledger.getAddress(),formatEther(await ledger.getBalance()))
	console.log("nounce", await ledger.getTransactionCount())
	console.log("------------- connect signer ---------")
	Greeter =(Greeter).connect(ledger);
 let greeter = 	await Greeter.deploy("hi");
 await greeter.deployed()


	console.log("Greeter deployed to:", greeter.address);
	console.log(await greeter.greet())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
