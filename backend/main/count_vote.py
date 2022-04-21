import json
from web3 import Web3

publicKey = "0xD0e203A04Eb4024Fbd90768b46E37aC67F1Cd707"
privateKey ="9f94794beb1b094dfa4dd85f1190703500e5179fe4b53767dcfc785eaa4620b0"
contractAddress = "0x5179BB109548f4e5D06fA9a90a3142C4F4A96419"

infura_url = "https://rinkeby.infura.io/v3/8c6a3e46d78044648168f270509e1fdd"
web3 = Web3(Web3.HTTPProvider(infura_url))

web3.eth.default_account=publicKey


abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterId",
          "type": "string"
        }
      ],
      "name": "count",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "vote",
          "type": "string"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voterCount",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "voterlist",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]

contract = web3.eth.contract(address=contractAddress, abi=abi)
 

def getVote(voterId):
    return contract.functions.count(voterId).call()