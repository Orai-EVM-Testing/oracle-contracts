// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {IWasmd} from "./precompiles/IWasmd.sol";
import {IJson} from "./precompiles/IJson.sol";
import {IAddr} from "./precompiles/IAddr.sol";
import {IBank} from "./precompiles/IBank.sol";

contract PriceOracle {

	address constant WASMD_PRECOMPILE_ADDRESS =
        0x9000000000000000000000000000000000000001;
    address constant JSON_PRECOMPILE_ADDRESS =
        0x9000000000000000000000000000000000000002;
    address constant ADDR_PRECOMPILE_ADDRESS =
        0x9000000000000000000000000000000000000003;
    address constant BANK_PRECOMPILE_ADDRESS =
        0x9000000000000000000000000000000000000004;

	IWasmd public WasmdPrecompile;
    IJson public JsonPrecompile;
    IAddr public AddrPrecompile;
    IBank public BankPrecompile;

	string public wasmOracleAddress;

    
	
	constructor(string memory wasmOracleAddress_) {
		WasmdPrecompile = IWasmd(WASMD_PRECOMPILE_ADDRESS);
        JsonPrecompile = IJson(JSON_PRECOMPILE_ADDRESS);
        AddrPrecompile = IAddr(ADDR_PRECOMPILE_ADDRESS);
        BankPrecompile = IBank(BANK_PRECOMPILE_ADDRESS);
		wasmOracleAddress = wasmOracleAddress_;
	}


	function getPriceOCH() public view returns (uint256) {
		string memory symbol = _formatPayload(
            "key",
            "OCH"
        );
		string memory req = _curlyBrace(
            _formatPayload("get_price_detail", _curlyBrace(symbol))	
        );
		bytes memory response = WasmdPrecompile.query(wasmOracleAddress, bytes(req));
		
        return JsonPrecompile.extractAsUint256(response, "price");
	}

    function _formatPayload(string memory key, string memory value) internal pure returns (string memory) {
			return _join(_doubleQuotes(key), value, ":");
	}

	function _curlyBrace(string memory s) internal pure returns (string memory) {
			return string.concat("{", string.concat(s, "}"));
	}

	function _doubleQuotes(string memory s) internal pure returns (string memory) {
			return string.concat("\"", string.concat(s, "\""));
	}

	function _join(string memory a, string memory b, string memory separator) internal pure returns (string memory) {
			return string.concat(a, string.concat(separator, b));
	}

}
