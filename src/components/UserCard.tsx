'use client';

import { CaretRight, Flame, Wallet } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import Image from "next/image";
import { normalize } from "path";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import CustomAvatar from "./CustomAvatar";
import Link from "next/link";
import { renderWalletAddress } from "../utils/string";

const UserCard: React.FC = () => {
  const { address } = useAccount();
  const ensNameResult = useEnsName({
    address,
  });

  let ensImage: string | undefined = undefined;

  const result = useEnsAvatar({
    name: normalize(ensNameResult?.data || ''),
  })
  if (result && result.data) {
    ensImage = result.data;
  }


  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center bg-primary-gradient-2 py-2 px-3 rounded-t-[24px] gap-1">
        <Flame weight="fill" size={14} />
        <p className="text-xs font-medium">0 Days</p>
        <p className="text-xs">login strike</p>
      </div>
      <div className="flex flex-col bg-zinc-950 rounded-b-[24px] gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            {address && (<CustomAvatar address={address} ensImage={ensImage} size={50} />)}
            <div className="flex flex-col gap-1">
              {ensNameResult?.data && (
                <p className="text-sm font-medium">{ensNameResult.data}</p>
              )}
              <p className="text-xs text-zinc-400">{renderWalletAddress(address)}</p>
            </div>
          </div>
          {/* Will used later */}
          {/* <div className="flex gap-1 items-center">
            <Image
              src='/images/badge-01.png'
              alt="badge 1"
              width={28}
              height={28}
              style={{ width: '28px', height: 'auto' }}
              className="object-cover"
            />
            <Image
              src='/images/badge-02.png'
              alt="badge 1"
              width={28}
              height={28}
              style={{ width: '28px', height: 'auto' }}
              className="object-cover"
            />
            <Image
              src='/images/badge-03.png'
              alt="badge 1"
              width={28}
              height={28}
              style={{ width: '28px', height: 'auto' }}
              className="object-cover"
            />
            <div className="flex items-center text-xs text-zinc-400">
              <p>+12</p>
              <CaretRight weight="bold" size={16} />
            </div>
          </div> */}
        </div>
        <div className="relative">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
            <div className="text-white text-base">Coming soon</div>
          </div>
          <div className="flex items-center w-full bg-zinc-900 rounded-xl p-3 blur-sm">
            <div className="flex flex-col items-center gap-1 w-5/12">
              <p className="text-xs text-zinc-400">Portfolio</p>
              <p className="text-sm font-medium">$12,233.21</p>
            </div>
            <div className="w-2/12 flex justify-center items-center">
              <Divider type="vertical" className="!m-0 border-[1px] !h-6 border-zinc-700" />
            </div>
            <div className="flex flex-col items-center gap-1 w-5/12">
              <p className="text-xs text-zinc-400">Profit/loss</p>
              <p className="text-sm font-medium text-green-500">$159,092.43</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Link href="/my-position" className="w-full flex justify-center items-center gap-1 bg-zinc-800 rounded-xl p-3">
            <Wallet weight="bold" size={16} />
            <p className="text-sm font-medium">Your position</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserCard;