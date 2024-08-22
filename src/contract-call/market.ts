import { wagmiCoreConfig } from "@/config/wagmi";
import { IMarketDataItem } from "@/types/market";
import { bettingContractAbi } from "../../contracts/main";
import { bettingContractAddress } from "@/config/network";
import { readContract, readContracts } from "@wagmi/core";
import {
  transformMarketItemFromContract,
  transformMyPositionItemFromContract,
} from "@/transform/market";

export const getBettingList = async (): Promise<IMarketDataItem[]> => {
  try {
    const betIds = await readContract(wagmiCoreConfig, {
      abi: bettingContractAbi,
      address: bettingContractAddress,
      functionName: "getAllBetIds",
    } as any);

    if (betIds && (betIds as BigInt[])?.length > 0) {
      const contractCalls = (betIds as BigInt[])?.map((id) => ({
        abi: bettingContractAbi,
        address: bettingContractAddress,
        functionName: "getBetDetails",
        args: [Number(id)],
      }));

      const marketListData = await readContracts(wagmiCoreConfig, {
        contracts: contractCalls as any,
      });

      const transformedData =
        marketListData?.map((item: any) =>
          transformMarketItemFromContract(item.result)
        ) || [];

      return transformedData;
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMyPositionList = async (address: string) => {
  try {
    const myPositionList = await readContract(wagmiCoreConfig, {
      abi: bettingContractAbi,
      address: bettingContractAddress,
      functionName: "getUserBets",
      args: [address as any],
    } as any);

    if (myPositionList && (myPositionList as any[])?.length > 0) {
      const transformedData =
        (myPositionList as any[])?.map((item: any) =>
          transformMyPositionItemFromContract(item)
        ) || [];

      return transformedData;
    }

    return [];
  } catch (error) {
    return [];
  }
};
