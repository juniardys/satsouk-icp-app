"use client";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowsClockwise,
  CaretDown,
  Check,
  Minus,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const MarketDetailPlaceOrderCard: React.FC = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [isMarket, setIsMarket] = useState(true);
  const [isYes, setIsYes] = useState(true);
  const [slippageToleranceButton, setSlippageToleranceButton] = useState<
    number | null
  >(null);
  const [slippageToleranceValue, setSlippageToleranceValue] = useState(0);
  const incrementSlippageToleranceValue = () =>
    setSlippageToleranceValue((prev) =>
      parseFloat((prev + 0.1).toFixed(1)) <= 1
        ? parseFloat((prev + 0.1).toFixed(1))
        : 1
    );
  const decrementSlippageToleranceValue = () =>
    setSlippageToleranceValue((prev) =>
      parseFloat((prev - 0.1).toFixed(1)) >= 0.1
        ? parseFloat((prev - 0.1).toFixed(1))
        : 0.1
    );

  const [amountBuyValue, setAmountBuyValue] = useState(0);
  const incrementAmountBuyValue = () =>
    setAmountBuyValue((prev) =>
      parseFloat((prev + 100).toFixed(1)) <= 10000
        ? parseFloat((prev + 100).toFixed(1))
        : 10000
    );
  const decrementAmountBuyValue = () =>
    setAmountBuyValue((prev) =>
      parseFloat((prev - 100).toFixed(1)) >= 0.1
        ? parseFloat((prev - 100).toFixed(1))
        : 100
    );

  const [limitPriceValue, setLimitPriceValue] = useState(0);
  const incrementLimitPriceValue = () =>
    setLimitPriceValue((prev) =>
      parseFloat((prev + 100).toFixed(1)) <= 10000
        ? parseFloat((prev + 100).toFixed(1))
        : 10000
    );
  const decrementLimitPriceValue = () =>
    setLimitPriceValue((prev) =>
      parseFloat((prev - 100).toFixed(1)) >= 0.1
        ? parseFloat((prev - 100).toFixed(1))
        : 100
    );

  const [limitShareValue, setLimitShareValue] = useState(0);
  const incrementLimitShareValue = () =>
    setLimitShareValue((prev) =>
      parseFloat((prev + 100).toFixed(1)) <= 10000
        ? parseFloat((prev + 100).toFixed(1))
        : 10000
    );
  const decrementLimitShareValue = () =>
    setLimitShareValue((prev) =>
      parseFloat((prev - 100).toFixed(1)) >= 0.1
        ? parseFloat((prev - 100).toFixed(1))
        : 100
    );

  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <div className="flex flex-col bg-zinc-950 rounded-[24px] gap-4 p-6 w-[394px]">
        {/*Sell, Buy and Menu*/}
        <div className="flex justify-between items-center w-[346px] h-6">
          <div className="flex items-center gap-4">
            <div
              className={` font-medium text-base leading-6 cursor-pointer ${
                isBuy ? "text-white" : "text-zinc-600"
              }`}
              onClick={() => setIsBuy(true)}
            >
              Buy
            </div>
            <div
              className={` font-medium text-base leading-6 cursor-pointer ${
                !isBuy ? "text-white" : "text-zinc-600"
              }`}
              onClick={() => setIsBuy(false)}
            >
              Sell
            </div>
          </div>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<CaretDown color="white" />}
              bg="transparent"
              p={0}
              _hover={{ bg: "transparent" }}
              _focus={{ bg: "transparent", boxShadow: "none" }}
              _active={{ bg: "transparent", boxShadow: "none" }}
            >
              <span className="font-semibold text-base leading-6 text-white cursor-pointer">
                {isMarket ? "Market" : "Limit"}
              </span>
            </MenuButton>
            <MenuList
              className="absolute z-7 p-2 gap-2 w-[189px] h-[104px]  flex flex-col"
              right={-20}
              backgroundColor="#18181B"
              rounded="16px"
              border="none"
            >
              <MenuItem
                backgroundColor="#18181B"
                onClick={() => setIsMarket(true)}
                _hover={{ bg: "#27272A" }}
              >
                <span className=" font-normal text-base leading-6 text-white">
                  Market
                </span>
              </MenuItem>
              <MenuItem
                backgroundColor="#18181B"
                onClick={() => setIsMarket(false)}
                _hover={{ bg: "#27272A" }}
              >
                <span className=" font-normal text-base leading-6 text-white">
                  Limit
                </span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        {/*Divider*/}
        <div className="w-[346px] h-[1px] bg-[#27272A] z-10"></div>

        {/*Yes or No*/}
        <div className="flex flex-col items-start gap-2 w-[346px] h-[68px]">
          <div className="flex flex-row justify-between items-center gap-2 w-[346px] h-[20px]">
            <div className="text-sm font-normal text-zinc-400">Pick a side</div>
            <ArrowsClockwise className="w-[16px] h-[16px] text-white" />
          </div>
          <div className="flex flex-row items-start gap-2 w-[346px] h-[40px]">
            <Button
              bg={isYes ? "#052E16" : "#27272A"}
              colorScheme={isYes ? "green" : "gray"}
              width="169px"
              height="40px"
              borderRadius="12px"
              boxShadow="inset 0px -2.5px 0px rgba(0, 0, 0, 0.24)"
              _hover={{ bg: isYes ? "#052E16" : "#27272A" }}
              _active={{ bg: isYes ? "#052E16" : "#27272A" }}
              _focus={{ boxShadow: "none" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
              onClick={() => setIsYes(true)}
            >
              <span
                className={`text-sm font-medium ${
                  isYes ? "text-green-500" : "text-zinc-500"
                }`}
              >
                Yes 95¢
              </span>
            </Button>
            <Button
              bg={!isYes ? "#4C0519" : "#27272A"}
              colorScheme={!isYes ? "rose" : "gray"}
              color={!isYes ? "#F43F5E" : "#27272A"}
              width="169px"
              height="40px"
              borderRadius="12px"
              boxShadow="inset 0px -2.5px 0px rgba(0, 0, 0, 0.24)"
              _hover={{ bg: !isYes ? "#4C0519" : "#27272A" }}
              _active={{ bg: !isYes ? "#4C0519" : "#27272A" }}
              _focus={{ boxShadow: "none" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
              onClick={() => setIsYes(false)}
            >
              <span
                className={`text-sm font-medium ${
                  !isYes ? "text-f43f5e" : "text-zinc-500"
                }`}
              >
                No 69¢
              </span>
            </Button>
          </div>
        </div>

        {/*Buy + Market Slippage Tolerance */}
        {isMarket && (
          <Flex
            direction="column"
            align="flex-start"
            p={0}
            gap="2"
            w="346px"
            h="116px"
          >
            {/* Label */}
            <p className="w-[135px] h-[20px]  font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
              Slippage tolerance
            </p>

            {/* Buttons Container */}
            <Flex
              direction="row"
              align="flex-start"
              p={0}
              gap="2"
              w="346px"
              h="40px"
            >
              {/* Button 1 */}
              <Button
                w="110px"
                h="40px"
                bg={slippageToleranceButton === 0.1 ? "#FFFFFF" : "#27272A"} // Matching active color
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="10px 18px"
                gap="6px"
                onClick={() => {
                  setSlippageToleranceButton(0.1);
                  setSlippageToleranceValue(0.1);
                }}
                className={`${
                  slippageToleranceButton === 0.1 ? "shadow-md" : "shadow-sm"
                } transition-shadow duration-200`}
              >
                <p
                  className={`w-[36px] h-[20px]  font-semibold text-[14px] leading-[20px] ${
                    slippageToleranceButton === 0.1
                      ? "text-[#09090B]"
                      : "text-[#FFFFFF]"
                  }`}
                >
                  0.1%
                </p>
              </Button>

              {/* Button 2 */}
              <Button
                w="110px"
                h="40px"
                bg={slippageToleranceButton === 0.5 ? "#FFFFFF" : "#27272A"} // Matching active color
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="10px 18px"
                gap="6px"
                onClick={() => {
                  setSlippageToleranceButton(0.5);
                  setSlippageToleranceValue(0.5);
                }}
                className={`${
                  slippageToleranceButton === 0.5 ? "shadow-md" : "shadow-sm"
                } transition-shadow duration-200`}
              >
                <p
                  className={`w-[36px] h-[20px]  font-semibold text-[14px] leading-[20px] ${
                    slippageToleranceButton === 0.5
                      ? "text-[#09090B]"
                      : "text-[#FFFFFF]"
                  }`}
                >
                  0.5%
                </p>
              </Button>

              {/* Button 3 */}
              <Button
                w="110px"
                h="40px"
                bg={slippageToleranceButton === 1 ? "#FFFFFF" : "#27272A"} // Matching active color
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="10px 18px"
                gap="6px"
                onClick={() => {
                  setSlippageToleranceButton(1);
                  setSlippageToleranceValue(1);
                }}
                className={`${
                  slippageToleranceButton === 1 ? "shadow-md" : "shadow-sm"
                } transition-shadow duration-200`}
              >
                <p
                  className={`w-[36px] h-[20px]  font-semibold text-[14px] leading-[20px] ${
                    slippageToleranceButton === 1
                      ? "text-[#09090B]"
                      : "text-[#FFFFFF]"
                  }`}
                >
                  1%
                </p>
              </Button>
            </Flex>

            {/* Value Field */}
            <Flex
              direction="row"
              align="center"
              p={0}
              gap="1.5"
              w="346px"
              h="40px"
            >
              <Button
                onClick={decrementSlippageToleranceValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Minus weight="bold" />
              </Button>

              <Flex
                direction="row"
                align="center"
                p="10px 12px"
                gap="8px"
                w="266px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                justifyContent="center"
              >
                <p className=" font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                  {slippageToleranceValue}%
                </p>
              </Flex>

              <Button
                onClick={incrementSlippageToleranceValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Plus weight="bold" />
              </Button>
            </Flex>
          </Flex>
        )}

        {/*Amount */}
        {isMarket && isBuy && (
          <Flex direction="column" align="flex-start" p={0} gap="2" w="346px">
            {/* Label */}
            <p className="w-[135px] h-[20px]  font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
              Amount
            </p>

            {/* Value Field */}
            <Flex
              direction="row"
              align="center"
              p={0}
              gap="1.5"
              w="346px"
              h="40px"
            >
              <Button
                onClick={decrementAmountBuyValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Minus weight="bold" />
              </Button>

              <Flex
                direction="row"
                align="center"
                p="10px 12px"
                gap="8px"
                w="266px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                justifyContent="center"
              >
                <p className=" font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                  {amountBuyValue}¢
                </p>
              </Flex>

              <Button
                onClick={incrementAmountBuyValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Plus weight="bold" />
              </Button>
            </Flex>
          </Flex>
        )}

        {/*Limit Price*/}
        {!isMarket && (
          <Flex direction="column" align="flex-start" p={0} gap="2" w="346px">
            {/* Label */}
            <p className="w-[135px] h-[20px]  font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
              Limit Price
            </p>

            {/* Value Field */}
            <Flex
              direction="row"
              align="center"
              p={0}
              gap="1.5"
              w="346px"
              h="40px"
            >
              <Button
                onClick={decrementLimitPriceValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Minus weight="bold" />
              </Button>

              <Flex
                direction="row"
                align="center"
                p="10px 12px"
                gap="8px"
                w="266px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                justifyContent="center"
              >
                <p className=" font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                  {limitPriceValue}¢
                </p>
              </Flex>

              <Button
                onClick={incrementLimitPriceValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Plus weight="bold" />
              </Button>
            </Flex>
          </Flex>
        )}

        {/*Limit Shares*/}
        {((isMarket && !isBuy) ||
          (!isMarket && isBuy) ||
          (!isMarket && !isBuy)) && (
          <Flex direction="column" align="flex-start" p={0} gap="2" w="346px">
            {/* Label */}
            <p className="w-[135px] h-[20px]  font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
              Shares
            </p>

            {/* Value Field */}
            <Flex
              direction="row"
              align="center"
              p={0}
              gap="1.5"
              w="346px"
              h="40px"
            >
              <Button
                onClick={decrementLimitShareValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Minus weight="bold" />
              </Button>

              <Flex
                direction="row"
                align="center"
                p="10px 12px"
                gap="8px"
                w="266px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                justifyContent="center"
              >
                <p className=" font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                  {limitShareValue}¢
                </p>
              </Flex>

              <Button
                onClick={incrementLimitShareValue}
                w="40px"
                h="40px"
                bg="#18181B"
                borderRadius="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="#A1A1AA"
                fontSize="20px"
              >
                <Plus weight="bold" />
              </Button>
            </Flex>
          </Flex>
        )}

        {/*Expiration*/}
        {!isMarket && (
          <Flex
            direction="column"
            align="flex-start"
            p="0"
            gap="6px"
            w="346px"
            h="66px"
          >
            <p className="w-[135px] h-[20px]  font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
              Set Expiration
            </p>

            <Flex
              direction="row"
              align="flex-start"
              p="0"
              gap="12px"
              w="346px"
              h="40px"
            >
              <Flex
                direction="row"
                justify="flex-start"
                align="center"
                p="2px"
                w="64px"
                h="40px"
                bg={
                  isOpen
                    ? "linear-gradient(90deg, #F43F5E 0%, #F59E0B 100%)"
                    : "#18181B"
                }
                borderRadius="8px"
                position="relative"
                transition="background 0.3s ease"
              >
                <Box
                  position="absolute"
                  left={isOpen ? "calc(100% - 36px)" : "4px"}
                  transition="left 0.3s ease"
                  bg={isOpen ? "white" : "#52525B"}
                  borderRadius="8px"
                  w="32px"
                  h="32px"
                  p="4px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton
                    icon={
                      isOpen ? (
                        <Check weight="bold" size={16} color="#A1A1AA" />
                      ) : (
                        <Minus weight="bold" size={16} color="#27272A" />
                      )
                    }
                    aria-label={isOpen ? "Checked" : "Unchecked"}
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    _focus={{ boxShadow: "none" }}
                    onClick={onToggle}
                  />
                </Box>
              </Flex>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                p="0"
                gap="6px"
                w="270px"
                h="40px"
                opacity={isOpen ? 1 : 0.4}
              >
                <Flex
                  direction="row"
                  justify="center"
                  align="center"
                  p="10px 12px"
                  gap="8px"
                  w="270px"
                  h="40px"
                  bg="#18181B"
                  borderRadius="12px"
                >
                  <Input
                    disabled={!isOpen}
                    variant="unstyled"
                    fontStyle="normal"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="20px"
                    color="#A1A1AA"
                    w="203px"
                    h="20px"
                    type="number"
                    min="1"
                    step="1"
                    pattern="[0-9]*"
                  />
                </Flex>
              </Box>
            </Flex>
          </Flex>
        )}

        {/*Buy Sell Button*/}
        <Button
          w="346px"
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
          marginBottom={2}
          marginTop={2}
        >
          <p className="w-[27px] h-[20px]  font-semibold text-[14px] leading-[20px] text-[#FFFFFF]">
            {isBuy ? "Buy" : "Sell"}
          </p>
        </Button>

        {/*Total Text Set*/}
        {!isMarket && (
          <div className="flex flex-row justify-between items-start p-0 gap-6 w-[346px] h-[20px]">
            <div className="w-[135px] h-[20px]">
              <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                Total
              </p>
            </div>
            <div className="w-[135px] h-[20px] flex justify-end">
              <p className="font-normal text-[14px] leading-[20px] text-[#F97316]">
                $48.42
              </p>
            </div>
          </div>
        )}

        {/*Avg Pricce Text Set*/}
        {isMarket && (
          <div className="flex flex-row justify-between items-start p-0 gap-6 w-[346px] h-[20px]">
            <div className="h-[20px]">
              <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                Avg. Price
              </p>
            </div>
            <div className=" h-[20px] flex justify-end">
              <p className="font-normal text-[14px] leading-[20px] text-[#F97316]">
                2.5¢
              </p>
            </div>
          </div>
        )}

        {/*Est. received Text Set*/}
        {isMarket && !isBuy && (
          <div className="flex flex-row justify-between items-start p-0 gap-6 w-[346px] h-[20px]">
            <div className="w-[135px] h-[20px]">
              <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                Est. received
              </p>
            </div>
            <div className="w-[135px] h-[20px] flex justify-end">
              <p className="font-normal text-[14px] leading-[20px] text-white">
                $28.66
              </p>
            </div>
          </div>
        )}

        {/*Shares Text Set*/}
        {isMarket && isBuy && (
          <div className="flex flex-row justify-between items-start p-0 gap-6 w-[346px] h-[20px]">
            <div className=" h-[20px]">
              <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                Shares
              </p>
            </div>
            <div className=" h-[20px] flex justify-end">
              <p className="font-normal text-[14px] leading-[20px] text-white">
                381,273.63
              </p>
            </div>
          </div>
        )}

        {/*Potential return Text Set*/}
        {isBuy && (
          <div className="flex flex-row justify-between items-start p-0 gap-6 w-[346px] h-[20px]">
            <div className=" h-[20px]">
              <p className="font-normal text-[14px] leading-[20px] text-[#A1A1AA]">
                Potential return
              </p>
            </div>
            <div className=" h-[20px] flex justify-end">
              <p className="font-normal text-[14px] leading-[20px] text-[#22C55E]">
                $381,273.63 (3,837%)
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MarketDetailPlaceOrderCard;
