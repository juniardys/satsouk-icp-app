import dayjs from "dayjs";
import { IMarketDataItem, IMarketOption } from "@/types/market";
import { formatEther } from "viem";
import { IMyPositionDataItem } from "@/types/my-position";

export function transformMarketItemFromContract(result: any): IMarketDataItem {
  // Destructure the result array into individual variables
  const [
    title,
    category,
    isAIPick,
    image,
    executionTime, // Timestamp
    expirationDate, // Timestamp
    id,
    resultStatus,
    optionKeys,
    optionAmounts,
  ] = result;

  // Determine the type of the market based on the number of options
  const type = optionKeys.length === 2 ? "binary" : "selection";

  // Convert BigInt amounts to number and calculate total volume
  const weiToEther = 1e-18; // Conversion factor from wei to ether
  const amounts = optionAmounts.map(
    (amount: BigInt) => Number(amount) * weiToEther
  );
  const totalVolume = amounts.reduce(
    (acc: number, amount: number) => acc + amount,
    0
  );

  // Transform options into IMarketOption array with percentage calculation
  const options: IMarketOption[] = optionKeys.map(
    (key: string, index: number) => {
      const volume = amounts[index];
      const percentage = totalVolume > 0 ? (volume / totalVolume) * 100 : 0; // Calculate percentage

      return {
        label: key,
        percentage,
        volume,
      };
    }
  );

  // Create the IMarketDataItem object
  const marketDataItem: IMarketDataItem = {
    id: Number(id), // Ensure the id is a number
    image,
    title,
    category,
    isAIPick,
    type,
    options,
    volume: totalVolume,
    executionTime: dayjs.unix(Number(executionTime)).toDate(), // Convert timestamp to Date
    expirationDate: dayjs.unix(Number(expirationDate)).toDate(), // Convert timestamp to Date
  };

  return marketDataItem;
}

export function transformMyPositionItemFromContract(
  contractData: any
): IMyPositionDataItem {
  return {
    id: Number(contractData.id),
    image: contractData.image,
    title: contractData.title,
    datePurchased: dayjs.unix(Number(contractData.datePurchased)).toDate(),
    volume: parseFloat(formatEther(contractData.volume, "wei")),
    position: contractData.position,
    amount: parseFloat(formatEther(contractData.amount, "wei")),
    potentialPrize: parseFloat(formatEther(contractData.potentialPrize, "wei")),
  };
}
