const dexerV2RouterAbi = [
	{
		type: 'constructor',
		inputs: [
			{
				name: 'factoryAddress',
				type: 'address',
				internalType: 'address'
			}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'addLiquidity',
		inputs: [
			{ name: 'tokenA', type: 'address', internalType: 'address' },
			{ name: 'tokenB', type: 'address', internalType: 'address' },
			{
				name: 'amountADesired',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountBDesired',
				type: 'uint256',
				internalType: 'uint256'
			},
			{ name: 'amountAMin', type: 'uint256', internalType: 'uint256' },
			{ name: 'amountBMin', type: 'uint256', internalType: 'uint256' },
			{ name: 'to', type: 'address', internalType: 'address' }
		],
		outputs: [
			{ name: 'amountA', type: 'uint256', internalType: 'uint256' },
			{ name: 'amountB', type: 'uint256', internalType: 'uint256' },
			{
				name: 'amountLPToken',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'i_factory',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'contract IDexerV2Factory'
			}
		],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'removeLiquidity',
		inputs: [
			{ name: 'tokenA', type: 'address', internalType: 'address' },
			{ name: 'tokenB', type: 'address', internalType: 'address' },
			{
				name: 'amountLPToken',
				type: 'uint256',
				internalType: 'uint256'
			},
			{ name: 'amountAMin', type: 'uint256', internalType: 'uint256' },
			{ name: 'amountBMin', type: 'uint256', internalType: 'uint256' },
			{ name: 'to', type: 'address', internalType: 'address' }
		],
		outputs: [
			{ name: 'amountA', type: 'uint256', internalType: 'uint256' },
			{ name: 'amountB', type: 'uint256', internalType: 'uint256' }
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'error',
		name: 'DexerV2Router__InsufficientAAmount',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Router__InsufficientBAmount',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Router__LiquidityCalculationFail',
		inputs: []
	},
	{ type: 'error', name: 'DexerV2Router__TransferFailed', inputs: [] },
	{
		type: 'error',
		name: 'SafeERC20FailedOperation',
		inputs: [{ name: 'token', type: 'address', internalType: 'address' }]
	}
] as const;

export default dexerV2RouterAbi;
