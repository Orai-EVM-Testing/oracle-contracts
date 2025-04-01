import hre, { ethers } from "hardhat";
import { PriceOracle__factory } from "../typechain-types";

async function deposit() {
    const { deployments } = hre;
    const { get } = deployments;
    const oracle = PriceOracle__factory.connect((await get("PriceOracle")).address, hre.ethers.provider);

    const wasmOracleAddressOnChain = await oracle.wasmOracleAddress();
    console.log(" wasmOracleAddressOnChain ", wasmOracleAddressOnChain);

    const price = await oracle.getPriceOCH();
    console.log(" price ", ethers.formatUnits(price, 6));
}

deposit();
