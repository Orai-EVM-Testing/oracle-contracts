import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from "hardhat";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, getChainId } = hre;
    const { deploy, get, execute } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("deployer: ", deployer);
    let balanceDeployer = await ethers.provider.getBalance(deployer);
    console.log("balanceDeployer: ", ethers.formatEther(balanceDeployer));
};
deploy.tags = ["before"];
export default deploy;
