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
			{
				name: 'tokenA',
				type: 'address',
				internalType: 'address'
			},
			{
				name: 'tokenB',
				type: 'address',
				internalType: 'address'
			},
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
			{
				name: 'amountAMin',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountBMin',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'to',
				type: 'address',
				internalType: 'address'
			}
		],
		outputs: [
			{
				name: 'amountA',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountB',
				type: 'uint256',
				internalType: 'uint256'
			},
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
		name: 'getAmountIn',
		inputs: [
			{
				name: 'amountOut',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'reserveIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'reserveOut',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		outputs: [
			{
				name: 'amountIn',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		stateMutability: 'pure'
	},
	{
		type: 'function',
		name: 'getAmountOut',
		inputs: [
			{
				name: 'amountIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'reserveIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'reserveOut',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		outputs: [
			{
				name: 'amountOut',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		stateMutability: 'pure'
	},
	{
		type: 'function',
		name: 'getAmountsIn',
		inputs: [
			{
				name: 'amountOut',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'path',
				type: 'address[]',
				internalType: 'address[]'
			}
		],
		outputs: [
			{
				name: 'amountsIn',
				type: 'uint256[]',
				internalType: 'uint256[]'
			}
		],
		stateMutability: 'view'
	},
	{
		type: 'function',
		name: 'getAmountsOut',
		inputs: [
			{
				name: 'amountIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'path',
				type: 'address[]',
				internalType: 'address[]'
			}
		],
		outputs: [
			{
				name: 'amountsOut',
				type: 'uint256[]',
				internalType: 'uint256[]'
			}
		],
		stateMutability: 'view'
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
		name: 'quote',
		inputs: [
			{
				name: 'amountIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'reserveIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'reserveOut',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		outputs: [
			{
				name: 'amountOtherTokenToAdd',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		stateMutability: 'pure'
	},
	{
		type: 'function',
		name: 'removeLiquidity',
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
			},
			{
				name: 'amountLPToken',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountAMin',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountBMin',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'to',
				type: 'address',
				internalType: 'address'
			}
		],
		outputs: [
			{
				name: 'amountA',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountB',
				type: 'uint256',
				internalType: 'uint256'
			}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'function',
		name: 'swapExactTokensForTokens',
		inputs: [
			{
				name: 'amountIn',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'amountOutMin',
				type: 'uint256',
				internalType: 'uint256'
			},
			{
				name: 'path',
				type: 'address[]',
				internalType: 'address[]'
			},
			{
				name: 'to',
				type: 'address',
				internalType: 'address'
			}
		],
		outputs: [
			{
				name: 'amounts',
				type: 'uint256[]',
				internalType: 'uint256[]'
			}
		],
		stateMutability: 'nonpayable'
	},
	{
		type: 'error',
		name: 'DexerV2Library__InsufficientAmount',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Library__InsufficientLiquidity',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Library__InvalidPath',
		inputs: []
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
		name: 'DexerV2Router__InsufficientOutputAmount',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Router__LiquidityCalculationFail',
		inputs: []
	},
	{
		type: 'error',
		name: 'DexerV2Router__TransferFailed',
		inputs: []
	},
	{
		type: 'error',
		name: 'SafeERC20FailedOperation',
		inputs: [
			{
				name: 'token',
				type: 'address',
				internalType: 'address'
			}
		]
	}
] as const;

export default dexerV2RouterAbi;
