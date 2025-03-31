import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-network-helpers";
import "@nomicfoundation/hardhat-ethers";
import dotenv from "dotenv";
dotenv.config();

const TEST_HDWALLET = {
    mnemonic: "test test test test test test test test test test test junk",
    path: "m/44'/60'/0'/0",
    initialIndex: 0,
    count: 20,
    passphrase: "",
};

const loadPrivateKeys = (): string[] => {
    const keys = [];
    if (process.env.PRIVATE_KEY) keys.push(process.env.PRIVATE_KEY);
    let index = 0;
    while (process.env[`PRIVATE_KEY_${index}`]) {
        keys.push(process.env[`PRIVATE_KEY_${index}`]);
        index++;
    }
    return keys.filter((key): key is string => key !== undefined);
};

const accounts = loadPrivateKeys().length > 0 ? loadPrivateKeys() : TEST_HDWALLET;

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.24",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                    viaIR: true,
                },
            },
        ],
    },
    networks: {
        hardhat: {
            chainId: 31337,
            accounts: [
                {
                    privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
                    balance: "1000000000000000000",
                },
            ],
            deploy: ["deploy/hardhat"],
            // forking: {
            //     url: "https://evm.orai.io",
            //     blockNumber: 54500000,
            // },
        },
        orai: {
            url: "https://evm.orai.io",
            accounts: accounts,
            deploy: ["deploy/orai"],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};

export default config;
