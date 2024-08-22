'use client';

import { IMarketDataItem } from "@/types/market";
import { capitalizeWords, formatNumber, formatNumberToUSD } from "@/utils/string";
import { Progress } from "@chakra-ui/react";
import { CaretRight, ChatCircleDots, Dot, DotsThreeVertical, HeartStraight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import BuyModal from "../modals/BuyModal";
import { useCrypto } from "@/context/CryptoContext";

interface MarketItemProps {
  data: IMarketDataItem;
  onSuccessPlaceBet: () => void;
}

const MarketItem: React.FC<MarketItemProps> = ({
  data,
  onSuccessPlaceBet = () => { },
}) => {
  const { price } = useCrypto();

  const [viewAll, setViewAll] = useState<boolean>(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
  const [optionSelected, setOptionSelected] = useState<string>('');

  const renderBinary = (): React.ReactNode => {
    return (
      <div className="flex justify-between gap-4">
        <button className="bg-green-950 text-green-500 py-3 px-5 w-[100px] h-auto rounded-xl text-sm font-medium hover:bg-green-900" onClick={() => handleClick('yes')}>
          {capitalizeWords(data.options?.[0]?.label || '')}
        </button>
        <div className="flex flex-col gap-2 w-full justify-end">
          <Progress value={data.options?.[0]?.percentage === data.options?.[1]?.percentage ? 50 : data.options?.[0]?.percentage} rounded="full" colorScheme="green" className="!bg-rose-600" />
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center text-green-500 text-xs">
              <p>{data.options?.[0]?.percentage.toFixed(2)}%</p>
              <Dot size={8} weight="fill" />
              <p>{formatNumberToUSD((data.options?.[0]?.volume || 0) * (price || 0))}</p>
            </div>
            <div className="flex gap-1 items-center text-rose-500 text-xs">
              <p>{data.options?.[1].percentage.toFixed(2)}%</p>
              <Dot size={8} weight="fill" />
              <p>{formatNumberToUSD((data.options?.[1]?.volume || 0) * (price || 0))}</p>
            </div>
          </div>
        </div>
        <button className="bg-rose-950 text-rose-500 py-3 px-5 w-[100px] h-auto rounded-xl text-sm font-medium hover:bg-rose-900" onClick={() => handleClick('no')}>
          {capitalizeWords(data.options?.[1]?.label || '')}
        </button>
      </div>
    )
  }

  const renderSelection = (): React.ReactNode => {
    let filteredSelectionOptions = data.options && data.options.length > 5 && !viewAll ? data.options.slice(0, 5) : data.options;

    return (
      <div className="flex flex-col gap-2">
        {data.options && data.options.length > 0 && (
          <>
            {filteredSelectionOptions?.map((item, index) => {
              return (
                <div className="flex gap-2 items-center" key={index}>
                  <div className="flex justify-between items-center bg-zinc-900 rounded-xl p-3 w-full">
                    <p className="text-sm">{item.label}</p>
                    <p className="text-sm">{item.percentage.toFixed(2)}%</p>
                  </div>
                  <button className="bg-green-950 text-green-500 py-3 px-5 w-[100px] h-auto rounded-xl text-sm font-medium hover:bg-green-900">
                    Bet
                  </button>
                </div>
              )
            })}
            {data.options.length > 5 && !viewAll && (
              <button className="flex justify-center items-center bg-zinc-900 rounded-xl p-3 w-full gap-3" onClick={() => setViewAll(true)}>
                <p className="text-sm font-medium text-zinc-400">+{data.options.length - 5} More</p>
                <div className="flex items-center gap-0.5">
                  <p className="text-sm">View All </p>
                  <CaretRight weight="bold" size={16} />
                </div>
              </button>
            )}
          </>
        )}
      </div>
    )
  }

  const handleClick = (option: string) => {
    setIsBuyModalOpen(true);
    setOptionSelected(option)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={data.image}
            width={1200}
            height={1200}
            alt="image"
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">{data.title}</p>
            <div className="flex gap-1 items-center">
              {data.category && (
                <div className="bg-zinc-800 text-zinc-400 text-xs px-2 py-0.5 rounded-[100px]">
                  {capitalizeWords(data.category)}
                </div>
              )}
              {data.isAIPick && (
                <div className="bg-zinc-800 text-primary-gradient text-xs px-2 py-0.5 rounded-[100px]">
                  <span className="bg-primary-gradient bg-clip-text text-transparent">AI Picks</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Will be used later */}
        {/* <DotsThreeVertical weight="bold" /> */}
      </div>
      {data.type === 'binary' && renderBinary()}
      {data.type === 'selection' && renderSelection()}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-zinc-400 cursor-pointer">
            <HeartStraight weight="bold" size={22} />
            <p className="text-sm">{formatNumber(data.totalLikes || 0)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-400">Total deposits</p>
          <p className="text-xs font-medium">{formatNumberToUSD((data.volume || 0) * (price || 0))}</p>
        </div>
      </div>
      <BuyModal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} onSuccessBet={() => onSuccessPlaceBet()} data={data} optionSelected={optionSelected} />
    </div>
  )
}

export default MarketItem;