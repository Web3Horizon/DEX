const dexerV2FactoryAbi = [
	{
		type: 'function',
		name: 'allPairs',
		inputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address'
			}
		],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'createPair',
		inputs: [
			{
				name: 'tokenA',
				type: 'address',
				internalType: 'address'
			},
			{
				name: 'tokenB',
				type: 'address',
				internalType: 'address'
			}
		],
		outputs: [
			{
				name: 'pair',
				type: 'address',
				internalType: 'address'
			}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'pairs',
		inputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address'
			},
			{
				name: '',
				type: 'address',
				internalType: 'address'
			}
		],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address'
			}
		],
		stateMutability: 'view'
	},
	{
		type: 'event',
		name: 'PairCreated',
		inputs: [
			{
				name: 'token0',
				type: 'address',
				indexed: true,
				internalType: 'address'
			},
			{
				name: 'token1',
				type: 'address',
				indexed: true,
				internalType: 'address'
			},
			{
				name: 'pair',
				type: 'address',
				indexed: false,
				internalType: 'address'
			},
			{
				name: '',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256'
			}
		],
		anonymous: false
	},
	{
		type: 'error',
		name: 'Create2EmptyBytecode',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Factory__ExistingPair',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Factory__IndeticalAddresses',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Factory__ZeroAddress',
		inputs: []
	},
	{
		type: 'error',
		name: 'FailedDeployment',
		inputs: []
	},
	{
		type: 'error',
		name: 'InsufficientBalance',
		inputs: [
			{
				name: 'balance',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'needed',
				type: 'uint256',
				internalType: 'uint256'
			}
		]
	}
] as const;

export default dexerV2FactoryAbi;
