'use client';

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import MarketTabsMenu from "./MarketTabsMenu";
import { IMarketDataItem, IMarketTabsMenuItem } from "@/types/market";
import { useEffect, useState } from "react";
import MarketItem from "./MarketItem";
import { Divider } from "antd";
import { MarketListData } from "@/app/data/market";
import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { bettingContractAddress } from "@/config/network";
import { bettingContractAbi } from "../../../../contracts/main";
import { useReadContract, useReadContracts } from "wagmi";
import { transformMarketItemFromContract } from "@/transform/market";
import { getBettingList } from "@/contract-call/market";

const tabList: IMarketTabsMenuItem[] = [
  {
    slug: 'for-you',
    label: 'For you',
  },
  {
    slug: 'gaming',
    label: 'Gaming',
    image: '/images/gaming-tab.png'
  },
  {
    slug: 'sports',
    label: 'Sports',
    image: '/images/sports-tab.png'
  },
  {
    slug: 'trending',
    label: 'Trending',
    image: '/images/trending-tab.png'
  },
];

const MarketListCard: React.FC = ({
}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [marketListData, setMarketListData] = useState<IMarketDataItem[]>([]);

  useEffect(() => {
    if (search && search.length > 0) {
      setMarketListData([]);
      setSelectedTabIndex(-1);
    } else {
      fetchBettingList();
      setSelectedTabIndex(0);
    }
  }, [search]);

  const fetchBettingList = async () => {
    const data = await getBettingList();
    setMarketListData(data);
  }

  let listCounter = 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-zinc-950 rounded-[24px] gap-8 p-6">
        <MarketTabsMenu tabList={tabList} onTabChange={(index) => setSelectedTabIndex(index)} selectedTabIndex={selectedTabIndex} />
        {marketListData?.length > 0 ? (
          <div className="relative">
            {tabList[selectedTabIndex]?.slug === 'sports' && (
              <div className="absolute top-0 left-0 bottom-0 right-0 z-20 w-full h-full m-auto flex justify-center items-center">
                <div className="rounded-xl px-4 py-2 text-white text-base bg-zinc-800">Coming soon</div>
              </div>
            )}
            <div className={cn(
              "flex flex-col gap-8",
              tabList[selectedTabIndex]?.slug === 'sports' ? 'blur-md pointer-events-none' : ''
            )}>
              {marketListData.map((item, dataIndex) => {
                if (['gaming', 'trending'].includes(tabList[selectedTabIndex]?.slug || '') && item.category !== tabList[selectedTabIndex]?.slug || '') {
                  return null;
                }

                if (item.type === 'selection') {
                  return null;
                }

                return (
                  <div className="flex flex-col gap-8" key={dataIndex}>
                    {listCounter++ > 0 && (
                      <Divider className="!border-zinc-800 !m-0 z-10" />
                    )}
                    <MarketItem data={item} onSuccessPlaceBet={() => fetchBettingList()} />
                  </div>
                )
              })}
              {(tabList[selectedTabIndex]?.slug || false) && tabList[selectedTabIndex].slug !== 'sports' && (
                <div className="relative">
                  <div className="absolute top-0 left-0 bottom-0 right-0 z-20 w-full h-full m-auto flex justify-center items-center">
                    <div className="rounded-xl px-4 py-2 text-white text-base bg-zinc-800">Coming soon</div>
                  </div>
                  <div className="flex flex-col gap-8 blur-md">
                    <Divider className="!border-zinc-800 !m-0 z-10" />
                    <MarketItem data={MarketListData[3]} onSuccessPlaceBet={() => fetchBettingList()} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full p-6">
            <div className="w-full h-[500px] flex flex-col gap-4 justify-center items-center">
              <Image
                src={'/images/empty-search-icon.png'}
                width={100}
                height={100}
                alt="empty icon"
              />
              <div className="flex flex-col gap-2 w-1/3 justify-center items-center text-center">
                <p className="text-sm font-medium text-white">We couldn&apos;t find anything</p>
                <p className="text-xs text-zinc-500">Try using different keywords to find what you&apos;re looking for.</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Will be used later */}
      {/* <button className="flex justify-center items-center bg-zinc-950 rounded-[24px] gap-3 p-2.5 cursor-pointer text-zinc-400">
        <p className="text-base">Load more</p>
        <CaretDown weight="bold" size={16} />
      </button> */}
    </div>
  )
}

export default MarketListCard;