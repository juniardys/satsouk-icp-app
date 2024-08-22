"use client";
import { bettingContractAddress } from "@/config/network";
import { useCrypto } from "@/context/CryptoContext";
import { IMarketDataItem } from "@/types/market";
import { capitalizeWords, formatNumberToUSD } from "@/utils/string";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Flex,
  Image,
  Progress,
  Stack,
  Button,
  Input,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { MinusCircle } from "@phosphor-icons/react";
import { Heart } from "@phosphor-icons/react/dist/csr/Heart";
import {
  Calendar,
  Circle,
  ArrowRight,
  ArrowsClockwise,
  Plus,
  Minus,
  PlusCircle,
} from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { bettingContractAbi } from "../../../../contracts/main";
import { parseUnits } from "viem";

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessBet: () => void;
  data?: IMarketDataItem;
  optionSelected?: string
}

const BuyModal: React.FC<BuyModalProps> = ({ isOpen, onClose, onSuccessBet, data, optionSelected = '' }) => {
  const { price } = useCrypto();
  const [isSide1, setIsSide1] = useState(true);
  const [amountBuyValue, setAmountBuyValue] = useState(0);

  const {
    data: hash,
    error,
    isPending,
    writeContract: placeBet
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    setIsSide1(optionSelected === data?.options?.[0]?.label);
  }, [optionSelected]);

  useEffect(() => {
    if (isConfirmed) {
      onClose();
      onSuccessBet();
    }
  }, [isConfirmed]);

  const incrementAmountBuyValue = () => {
    setAmountBuyValue((prev) =>
      parseFloat((prev + 1).toFixed(1)) <= 10000
        ? parseFloat((prev + 1).toFixed(1))
        : 10000
    );
  };

  const decrementAmountBuyValue = () => {
    setAmountBuyValue((prev) =>
      parseFloat((prev - 1).toFixed(1)) >= 0.1
        ? parseFloat((prev - 1).toFixed(1))
        : 0.1
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmountBuyValue(Math.max(0.1, Math.min(10000, value)));
    }
  };

  const [isFilled, setIsFilled] = useState(false);

  const handleLikeClick = () => {
    setIsFilled(!isFilled);
  };

  const handleBuyClick = async () => {
    const amount = Math.ceil((amountBuyValue / (price || 0)) * 1e6) / 1e6;
    placeBet({
      address: bettingContractAddress as `0x${string}`,
      abi: bettingContractAbi,
      functionName: "placeBet",
      args: [BigInt(data?.id || 0), String(isSide1 ? data?.options?.[0]?.label || '' : data?.options?.[1]?.label || '')],
      value: parseUnits(amount.toString(), 18)
    })
  }

  const [potentialReturnInUSD, potentialReturnPercentage] = useMemo(() => {
    if (amountBuyValue > 0) {
      const pickSideVolumeInUSD = ((isSide1 ? (data?.options?.[0]?.volume || 0) : (data?.options?.[1]?.volume || 0)) * (price || 0)) + amountBuyValue;
      const oppositeVolumeInUSD = (isSide1 ? (data?.options?.[1]?.volume || 0) : (data?.options?.[0]?.volume || 0)) * (price || 0);
      const fee = 0.01; // 1%
      const oppositeVolumeInUSDWithFee = oppositeVolumeInUSD > 0 ? oppositeVolumeInUSD * (1 - fee) : 0;
      const potentialReturnInUSD = (amountBuyValue / pickSideVolumeInUSD) * oppositeVolumeInUSDWithFee;
      const potentialReturnPercentage = (potentialReturnInUSD / amountBuyValue) * 100;
      return [Number((potentialReturnInUSD || 0).toFixed(2)), Number((potentialReturnPercentage || 0).toFixed(2))];
    }

    return [0, 0];
  }, [amountBuyValue, isSide1]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(9, 9, 11, 0.8)" />
      <ModalContent
        width="500px"
        height="fit-content"
        backgroundColor="transparent"
        borderRadius="24px"
        position="relative"
      >
        <ModalCloseButton
          width="40px"
          height="40px"
          backgroundColor="#27272A"
          borderRadius="12px"
          color="#FFFFFF"
          position="absolute"
          top="-50px"
          right="-50px"
          zIndex="1"
        />
        <ModalBody width="500px" padding="0">
          {data && (
            <>
              <Flex
                mb={2}
                direction="row"
                alignItems="start"
                padding="24px"
                gap="24px"
                backgroundColor="#18181B"
                borderRadius="24px"
                width="full"
                height="140px"
              >
                <Flex
                  direction="row"
                  alignItems="start"
                  gap="12px"
                  width="374px"
                  height="92px"
                >
                  <Image
                    src={data.image}
                    alt="Image"
                    width="72px"
                    height="72px"
                    borderRadius="md"
                    boxShadow="md"
                  />
                  <Flex
                    direction="column"
                    alignItems="start"
                    gap="10px"
                    width="290px"
                    height="92px"
                  >
                    <Flex
                      direction="row"
                      alignItems="center"
                      gap="12px"
                      width="236px"
                      height="16px"
                    >
                      <Flex
                        direction="row"
                        alignItems="center"
                        gap="4px"
                        height="16px"
                      >
                        <Calendar size={16} color="#A1A1AA" />
                        <p className="text-xs font-regular text-zinc-400">
                          {data.executionTime ? dayjs(data.executionTime).format('D MMM YYYY') : 'N/A'}
                        </p>
                      </Flex>
                      <Circle size={4} weight="fill" color="#71717A" />
                      <Flex
                        direction="row"
                        alignItems="center"
                        gap="6px"
                        height="16px"
                      >
                        <p className="text-xs font-regular text-zinc-400">Volume</p>
                        <p className="text-xs font-medium text-white">{formatNumberToUSD((data.volume || 0) * (price || 0))}</p>
                      </Flex>
                    </Flex>
                    <p className="text-sm font-medium text-white max-h-[56px]">
                      {data.title}
                    </p>
                    <Flex
                      direction="row"
                      alignItems="start"
                      gap="4px"
                      width="132px"
                      height="20px"
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        paddingX="8px"
                        paddingY="2px"
                        gap="10px"
                        backgroundColor="#3F3F46"
                        borderRadius="full"
                        width="64px"
                        height="20px"
                      >
                        <p className="text-xs font-regular text-zinc-400">
                          {capitalizeWords(data.category)}
                        </p>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        paddingX="8px"
                        paddingY="2px"
                        gap="10px"
                        backgroundColor="#3F3F46"
                        borderRadius="full"
                        width="64px"
                        height="20px"
                      >
                        {data.isAIPick && (
                          <p className="text-xs font-regular bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-300">
                            AI Picks
                          </p>
                        )}
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex
                  direction="row"
                  alignItems="center"
                  gap="4px"
                  width="54px"
                  height="24px"
                >
                  {isFilled ? (
                    <Heart
                      size={20}
                      weight="fill"
                      color="#FFFFFF"
                      onClick={handleLikeClick}
                    />
                  ) : (
                    <Heart size={20} color="#FFFFFF" onClick={handleLikeClick} />
                  )}

                  <p className="text-sm font-regular text-white">1.7k</p>
                </Flex>
              </Flex>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                padding="6"
                gap="6px"
                width="500px"
                backgroundColor="#18181B"
                borderRadius="24px"
              >
                <Flex
                  mt={2}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  gap="2.5"
                  width="100%"
                  height="auto"
                >
                  <Progress
                    value={data.options?.[0]?.percentage === data.options?.[1]?.percentage ? 50 : data.options?.[0]?.percentage}
                    className="!bg-rose-600"
                    size="sm"
                    rounded="100px"
                    hasStripe
                    isAnimated
                    width="100%"
                  />
                </Flex>

                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  padding="0"
                  gap="4"
                  width="452px"
                  height="16px"
                >
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    padding="0"
                    gap="1"
                    height="16px"
                    justifyContent="flex-start"
                  >
                    <p className="text-xs font-normal text-green-500">
                      {" "}
                      {formatNumberToUSD((data.options?.[0]?.volume || 0) * (price || 0))}
                    </p>
                    <Circle size={4} weight="fill" color="#22C55E" />
                    <p className="text-xs font-normal text-green-500">
                      {" "}
                      {capitalizeWords(data.options?.[0]?.label || '')} {data.options?.[0]?.percentage.toFixed(2)}%
                    </p>
                  </Flex>

                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    padding="0"
                    gap="1"
                    height="16px"
                    justifyContent="flex-end"
                  >
                    <p className="text-xs font-regular text-rose-500">{formatNumberToUSD((data.options?.[1]?.volume || 0) * (price || 0))}</p>
                    <Circle size={4} weight="fill" color="#F43F5E" />
                    <p className="text-xs font-regular text-rose-500">{capitalizeWords(data.options?.[1]?.label || '')} {data.options?.[1]?.percentage.toFixed(2)}%</p>
                  </Flex>
                </Flex>

                {/*Yes or No*/}
                <div className="flex flex-col items-start gap-2 w-full h-[68px] mt-4">
                  <div className="flex flex-row justify-between items-center gap-2  h-[20px]">
                    <div className="text-sm font-normal text-zinc-400">
                      Pick a side
                    </div>
                  </div>
                  <div className="flex flex-row items-start gap-2 w-full h-[40px]">
                    <Button
                      bg={isSide1 ? "#052E16" : "#27272A"}
                      colorScheme={isSide1 ? "green" : "gray"}
                      width="50%"
                      height="40px"
                      borderRadius="12px"
                      boxShadow="inset 0px -2.5px 0px rgba(0, 0, 0, 0.24)"
                      _hover={{ bg: isSide1 ? "#052E16" : "#27272A" }}
                      _active={{ bg: isSide1 ? "#052E16" : "#27272A" }}
                      _focus={{ boxShadow: "none" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                      onClick={() => setIsSide1(true)}
                    >
                      <span
                        className={`text-sm font-medium ${isSide1 ? "text-green-500" : "text-zinc-500"
                          }`}
                      >
                        {capitalizeWords(data.options?.[0]?.label || '')}
                      </span>
                    </Button>
                    <Button
                      bg={!isSide1 ? "#4C0519" : "#27272A"}
                      colorScheme={!isSide1 ? "rose" : "gray"}
                      color={!isSide1 ? "#F43F5E" : "#27272A"}
                      width="50%"
                      height="40px"
                      borderRadius="12px"
                      boxShadow="inset 0px -2.5px 0px rgba(0, 0, 0, 0.24)"
                      _hover={{ bg: !isSide1 ? "#4C0519" : "#27272A" }}
                      _active={{ bg: !isSide1 ? "#4C0519" : "#27272A" }}
                      _focus={{ boxShadow: "none" }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                      onClick={() => setIsSide1(false)}
                    >
                      <span
                        className={`text-sm font-medium ${!isSide1 ? "text-f43f5e" : "text-zinc-500"
                          }`}
                      >
                        {capitalizeWords(data.options?.[1]?.label || '')}
                      </span>
                    </Button>
                  </div>
                </div>

                {/*Amount Input*/}
                <Flex
                  mt={4}
                  direction="column"
                  align="flex-start"
                  p={0}
                  gap="2"
                  w="100%"
                >
                  {/* Label */}
                  <div className="flex justify-between items-center w-full">
                    <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                      Amount ($)
                    </p>
                    <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                      {Math.ceil((amountBuyValue / (price || 0)) * 1e6) / 1e6} ETH
                    </p>
                  </div>

                  {/* Value Field */}
                  <Flex
                    backgroundColor="#09090B"
                    direction="row"
                    align="center"
                    p={0}
                    gap="1.5"
                    w="100%"
                    h="40px"
                    rounded="12px"
                  >
                    {/* Minus Button */}
                    <div className="ml-[20px]">
                      <MinusCircle
                        color="#52525B"
                        weight="fill"
                        size={20}
                        onClick={decrementAmountBuyValue}
                      ></MinusCircle>
                    </div>

                    {/* Input Field */}
                    <input
                      type="number"
                      value={amountBuyValue}
                      onChange={handleInputChange}
                      className="w-full h-10 bg-[#09090B] rounded-lg text-[#A1A1AA] text-sm text-center border-none focus:outline-none"
                    />

                    {/* Plus Button */}
                    <div className="mr-[20px]">
                      <PlusCircle
                        color="#52525B"
                        weight="fill"
                        size={20}
                        onClick={incrementAmountBuyValue}
                      ></PlusCircle>
                    </div>
                  </Flex>
                </Flex>

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  padding="12px"
                  gap="10px"
                  width="452px"
                  height="44px"
                  bg="#052E16"
                  borderRadius="12px"
                  mt={4}
                >
                  <div className="flex flex-row justify-between items-start p-0 gap-6 w-full h-[20px]">
                    <div className=" h-[20px]">
                      <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                        Potential return
                      </p>
                    </div>
                    <div className=" h-[20px] flex justify-end">
                      <p className="font-normal text-[14px] leading-[20px] text-[#22C55E]">
                        {formatNumberToUSD(potentialReturnInUSD)} ({potentialReturnPercentage}%)
                      </p>
                    </div>
                  </div>
                </Box>

                {/*Buy Sell Button*/}
                <Button
                  w="100%"
                  h="40px"
                  bg="linear-gradient(90deg, #F43F5E 0%, #F59E0B 100%)"
                  boxShadow="inset 0px -2.5px 0px rgba(0, 0, 0, 0.24)"
                  borderRadius="12px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p="10px 18px"
                  gap="6px"
                  className="z-[5]"
                  marginTop={4}
                  onClick={handleBuyClick}
                  isLoading={isPending || isConfirming}
                >
                  <p className="w-[27px] h-[20px]  font-semibold text-[14px] leading-[20px] text-[#FFFFFF]">
                    Buy
                  </p>
                </Button>
                {error && (
                  <p className="text-sm text-red-500 w-full mt-1 text-center">
                    {error.message.split('.')[0]}
                  </p>
                )}
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
