import { IMyPositionDataItem } from "@/types/my-position";
import { CalendarBlank, DotOutline } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import dayjs from 'dayjs';
import { capitalizeWords, formatNumberToUSD } from "@/utils/string";
import { cn } from "@/utils/cn";
import { Divider } from "antd";
import { useCrypto } from "@/context/CryptoContext";

interface MyPositionItemProps {
  data?: IMyPositionDataItem;
}

const MyPositionItem: React.FC<MyPositionItemProps> = ({ data }) => {
  const { price } = useCrypto();

  if (!data) return <></>;

  const volumeInUSD = (data.volume || 0) * (price || 0);
  const amountInUSD = (data.amount || 0) * (price || 0);
  const potentialPrizeInUSD = ((data.potentialPrize || 0) * (price || 0)) - amountInUSD;

  return (
    <>
      <div className="flex justify-stretch gap-4">
        <div className="w-7/12 flex items-center gap-2">
          <Image
            src={data.image}
            alt={'image'}
            width={64}
            height={64}
            className="rounded-md"
          />
          <div className="flex flex-col h-full gap-1">
            <div className="flex gap-2 text-zinc-400">
              <div className="flex gap-1 items-center">
                <CalendarBlank weight="fill" size={16} />
                <p className="text-xs">{dayjs(data.datePurchased).format('D MMM YYYY')}</p>
              </div>
              <DotOutline size={16} weight="fill" className="text-zinc-600" />
              <div className="flex gap-1 items-center">
                <p className="text-xs">Volume</p>
                <p className="text-xs font-medium text-white">{formatNumberToUSD(volumeInUSD)}</p>
              </div>
            </div>
            <h2 className="text-sm font-medium">{data.title}</h2>
          </div>
        </div>
        <div className="w-5/12 bg-zinc-900 rounded-xl flex justify-evenly items-center text-zinc-400">
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-xs">Position</p>
            <p className={cn(
              "text-xs font-medium",
              data.position === 'no' ? 'text-rose-500' : 'text-green-500'
            )}>{capitalizeWords(data.position)}</p>
          </div>
          <Divider className="!border-zinc-700 !m-0 z-10 !h-6" type="vertical" />
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-xs">Amount</p>
            <p className="text-xs font-medium text-white">{formatNumberToUSD(amountInUSD)}</p>
          </div>
          <Divider className="!border-zinc-700 !m-0 z-10 !h-6" type="vertical" />
          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-xs">Potential Prize</p>
            <p className={cn(
              "text-xs font-medium",
              potentialPrizeInUSD > amountInUSD ? 'text-green-500' : 'text-rose-500'
            )}>{formatNumberToUSD(potentialPrizeInUSD)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPositionItem;