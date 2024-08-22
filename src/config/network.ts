import { Chain } from "@rainbow-me/rainbowkit";
import { type Chain as ViemChain } from "viem";

export const bobSepoliaTestnet = {
  id: 111,
  name: "BOB Sepolia (Testnet)",
  iconUrl: "https://docs.gobob.xyz/img/logo-light.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.gobob.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.gobob.xyz",
    },
  },
} as const satisfies Chain | ViemChain;

export const bobMainnet = {
  id: 60_808,
  name: "BOB Mainnet",
  iconUrl: "https://docs.gobob.xyz/img/logo-light.svg",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.gobob.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.gobob.xyz",
    },
  },
} as const satisfies Chain | ViemChain;

export const avalanche = {
  id: 43_114,
  name: "Avalanche",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain | ViemChain;

export const bettingContractAddress = process.env
  .NEXT_PUBLIC_BETTING_CONTRACT_ADDRESS as `0x${string}` | undefined;
