var fs = require('fs');
var Web3 = require('web3');
var http = require('http');
var web3;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22000"));
}
var simpleSource = fs.readFileSync('./module/poc.sol', "utf8");
console.log("simpleSource",simpleSource);
var simpleCompiled = web3.eth.compile.solidity(simpleSource);
var simpleRoot = Object.keys(simpleCompiled)[0];
var simpleContract = web3.eth.contract(simpleCompiled[simpleRoot].info.abiDefinition);
var simple = simpleContract.new({from:web3.eth.accounts[0], data: simpleCompiled[simpleRoot].code, gas: 300000}, function(e, contract) {
  if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            console.log(contract);
        }
    }
});
module.exports = {
    addDetails : function( name, age, callback) 
    { 
        simple.addDetails( name, age, function(callback, error)
        { 
            if (error) 
            { 
                console.log('error==>'+error);
                throw error 
            } 
            callback(); 
        });
    }, 

    getDataName : function( callback) 
    { 
        simple.getName(function(error, result)
        { 
            if (error) 
            { 
                throw error 
            } 
            console.log(result);
            callback(result); 
        });
    },

    getData : function( callback) 
    { 
        simple.call().getAge( function(error, result)
        { 
            if (error) 
            { 
                throw error 
            } 
            console.log(result);
            callback(result); 
        });
    },
}