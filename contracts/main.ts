export const bettingContractAbi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_tellorAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "removedAdmin",
        type: "address",
      },
    ],
    name: "AdminRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "correctAnswer",
        type: "string",
      },
    ],
    name: "BetAdminExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "correctAnswer",
        type: "string",
      },
    ],
    name: "BetExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bettor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "option",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "picture",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "executionTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string[]",
        name: "options",
        type: "string[]",
      },
    ],
    name: "BetRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oracleAnswer",
        type: "string",
      },
    ],
    name: "OracleAnswerRetrieved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAdmin",
        type: "address",
      },
    ],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_correctAnswer",
        type: "string",
      },
    ],
    name: "adminExecuteBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "admins",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "betIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bets",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isAIPick",
        type: "bool",
      },
      {
        internalType: "string",
        name: "picture",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "executionTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "enum BettingContract.BetStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "correctAnswer",
        type: "string",
      },
      {
        internalType: "string",
        name: "oracleAnswer",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betId",
        type: "uint256",
      },
    ],
    name: "executeBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllBetIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betId",
        type: "uint256",
      },
    ],
    name: "getBetDetails",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isAIPick",
        type: "bool",
      },
      {
        internalType: "string",
        name: "picture",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "executionTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expirationDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "enum BettingContract.BetStatus",
        name: "status",
        type: "uint8",
      },
      {
        internalType: "string[]",
        name: "optionKeys",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "optionAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betId",
        type: "uint256",
      },
    ],
    name: "getOptionsWithAmounts",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "main_arg",
        type: "string",
      },
      {
        internalType: "bytes[]",
        name: "extra_args",
        type: "bytes[]",
      },
    ],
    name: "getOracleAnswer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getTotalBetsOfUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserBets",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "datePurchased",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "volume",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "potentialPrize",
            type: "uint256",
          },
        ],
        internalType: "struct BettingContract.UserBetPosition[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_betId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_option",
        type: "string",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
      {
        internalType: "bool",
        name: "_isAIPick",
        type: "bool",
      },
      {
        internalType: "string",
        name: "_picture",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_executionTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expirationDate",
        type: "uint256",
      },
      {
        internalType: "string[]",
        name: "_options",
        type: "string[]",
      },
    ],
    name: "registerBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tellor",
    outputs: [
      {
        internalType: "contract ITellor",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
