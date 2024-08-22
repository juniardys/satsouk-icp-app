'use client';

import { IMarketTabsMenuItem } from "@/types/market";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect } from "react";

interface MarketTabsMenuProps {
  tabList?: IMarketTabsMenuItem[];
  selectedTabIndex?: number;
  onTabChange?: (index: number) => void;
}

const MarketTabsMenu: React.FC<MarketTabsMenuProps> = ({
  tabList = [],
  selectedTabIndex = 0,
  onTabChange,
}) => {
  return (
    <div className="flex gap-4">
      {tabList.map((item, index) => (
        <button
          key={index}
          className={cn(
            'w-full rounded-xl p-0.5',
            selectedTabIndex === index ? 'bg-primary-gradient' : 'bg-zinc-800'
          )}
          onClick={() => {
            if (onTabChange) {
              onTabChange(index);
            }
          }}
        >
          <div className={cn(
            "flex justify-between items-center pl-4 bg-zinc-800 w-full h-14 rounded-xl",
          )}>
            <p className="text-base font-medium">{item.label}</p>
            {item.image && (
              <Image
                src={item.image}
                alt="tab image"
                height={3600}
                width={3600}
                style={{ width: 'auto', height: '56px' }}
              />
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

export default MarketTabsMenu;