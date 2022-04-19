const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const election = require('./build/Storage.json');

const provider = new HDWalletProvider(
  'make token obtain pear method rack woman expect tumble voice label stereo',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/8c6a3e46d78044648168f270509e1fdd'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    election.abi
  ).deploy({ data: election.evm.bytecode.object })
    .send({ gas: '5000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();