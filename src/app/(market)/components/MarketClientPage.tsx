'use client';

import UserCard from "@/components/UserCard";
import MarketListCard from "./MarketListCard";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { useEffect, useState } from "react";
import { featureFlag } from "@/utils/feature-flag";
import { bettingContractAddress, bobMainnet, bobSepoliaTestnet } from "@/config/network";
import { bettingContractAbi } from "../../../../contracts/main";
import { transformMarketItemFromContract } from "@/transform/market";
import { useCrypto } from "@/context/CryptoContext";

const MarketClientPage: React.FC = () => {
  const { address } = useAccount();
  const { fetchPrice } = useCrypto();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (domLoaded) {
      fetchPrice('eth');
    }
  }, [domLoaded])

  if (!domLoaded) return <></>

  return (
    <>
      <div className="w-full flex gap-4 py-4 relative">
        {address && (
          <div className="w-1/3 flex flex-col gap-4 sticky top-[90px]">
            <UserCard />
            {/* Will be used later */}
            {/* <UserStatisticsCard />
            <SidebarMenu /> */}
          </div>
        )}
        <div className="w-2/3 mx-auto">
          <MarketListCard />
        </div>
      </div>
    </>
  )
}

export default MarketClientPage;