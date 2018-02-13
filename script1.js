a = eth.accounts[0]
web3.eth.defaultAccount = a;
console.log(eth.accounts);
//var simpleSource = 'contract simplestorage { uint public storedData; function simplestorage(uint initVal) { storedData = initVal; } function set(uint x) { storedData = x; } function get() constant returns (uint retVal) { return storedData; } }'
  var simpleSource = 'contract CalcSal {uint day;function set(uint x) {day = x;}function get() constant returns (uint) {return day*500;}}'
var simpleCompiled = web3.eth.compile.solidity(simpleSource);
var simpleRoot = Object.keys(simpleCompiled)[0];
var simpleContract = web3.eth.contract(simpleCompiled[simpleRoot].info.abiDefinition);
var simple = simpleContract.new(42, {from:web3.eth.accounts[0], data: simpleCompiled[simpleRoot].code, gas: 300000, privateFor: ["ROAZBWtSacxXQrOe3FGAqJDyJjFePR5ce4TSIzmJ0Bc="]}, function(e, contract) {
	if (e) {
		console.log("err creating contract:", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Address: " + contract.address);
			console.log(contract);
		}
	}
});
