import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ADDRESSES } from "../../utils/constants";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, getChainId } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const wasmOracleAddress = ADDRESSES.oraichain.oracleContracts;

    await deploy("PriceOracle", {
        contract: "PriceOracle",
        from: deployer,
        args: [wasmOracleAddress],
        log: true,
    });
};
deploy.tags = ["priceOracle"];
export default deploy;
