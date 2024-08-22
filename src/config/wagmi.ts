import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bobMainnet, bobSepoliaTestnet } from "./network";
import { featureFlag } from "@/utils/feature-flag";
import { createClient } from "viem";
import { createConfig, http } from "@wagmi/core";

const activeChain = featureFlag("NEXT_PUBLIC_USE_BOB_MAINNET")
  ? bobMainnet
  : bobSepoliaTestnet;

export const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME || "App",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
  chains: [activeChain],
  ssr: true,
});

export const wagmiCoreConfig = createConfig({
  chains: [activeChain],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
  ssr: true,
});
