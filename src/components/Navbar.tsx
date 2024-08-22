'use client';

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BellSimple, CaretDown, MagnifyingGlass, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string | null>(null);

  const debounceSearchInput = useDebouncedCallback(
    (value: string) => {
      setSearchInput(value)
    },
    1000,
  );

  useEffect(() => {
    if (searchInput !== null) {
      handleSearch();
    }
  }, [searchInput]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("search", searchInput!);
    router.push(`/?${params.toString()}`);
  }

  return (
    <>
      <div className="fixed w-full h-[74px] bg-zinc-900 z-10 flex justify-center inset-0">
        <div className="w-full h-full max-w-[1238px] py-4 px-3 flex justify-between items-center">
          <div className="flex gap-8 w-2/3">
            <Link href="/" className="flex items-center gap-1 w-fit">
              <Image
                src='/images/logo-white-colorful.png'
                alt="logo"
                height={500}
                width={1500}
                sizes="100%"
                style={{ width: 'auto', height: '100%' }}
              />
              <div className="bg-zinc-800 text-xs font-bold leading-4 py-[2px] px-[6px] rounded-[100px]">
                <span className="bg-primary-gradient bg-clip-text text-transparent">APP</span>
              </div>
            </Link>
            <div className="flex justify-start items-center gap-2 w-3/5">
              <Link href="/" className="flex items-center gap-1 bg-zinc-800 rounded-xl p-3">
                <SquaresFour weight="bold" size={16} />
                <p className="text-xs">Markets</p>
              </Link>
              <InputGroup className="w-full max-w-[360px]" bg='zinc.800' rounded='xl'>
                <InputLeftElement pointerEvents='none'>
                  <MagnifyingGlass weight="bold" size={14} className="text-zinc-400" />
                </InputLeftElement>
                <Input type='text' placeholder='Search markets' onChange={(e) => debounceSearchInput(e.target.value)} pl={10} fontSize='sm' rounded='xl' border="none" className="!placeholder-zinc-600" />
              </InputGroup>
            </div>
          </div>
          <div className="flex justify-end items-center w-1/3 gap-3">
            <button className="bg-zinc-800 rounded-xl h-10 w-10 relative flex justify-center items-center">
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full border-4 border-zinc-900"></span>
              <BellSimple weight="bold" size={16} />
            </button>
            <ConnectButton />
            {/* <button className="bg-zinc-800 rounded-xl flex items-center h-10 py-1 px-3 gap-3">
              <div className="flex gap-2 items-center">
                <Image
                  src='https://s3-alpha-sig.figma.com/img/66ff/f14b/a710b7b4b6638897ce10f65e5bae131b?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ha8GPCnghuDVG-iwQQIv4at8YPzNXBwelFB0dHgsFQKiquSrRQG4f-ZifpJIgjOgd8TpSAsGkDbSrbhwl-LrxsYMG0olCHd5ByRgCQDTyMqkNOU4Rq3Ap3px7o3t7hSyb9VqfeEFd7~f0G9AE5CvArsqMRjLCkQmK8-~kiJGEnkCJ0JrvWUC5jkVZdyIocB-5Aj12~duFQZLouShTNABgTdPsqaRt5AhPfF4ZzHzkjYkOhOrwj7zAXQLPRT0Wjjw8XCHGZrFIGOw3QEcXMHpJrXQZfM1r67LW9S63jhMqaHBI1UomULrRs8k3NSDTZrSC7So6ogp7Ns0CI9kSXy1ZQ__'
                  alt="user avatar"
                  height={200}
                  width={200}
                  style={{ width: '20px', height: '20px' }}
                  className="rounded-full"
                />
                <p className="text-xs font-medium">Ox51ea...8D35</p>
              </div>
              <CaretDown weight="bold" size={16} />
            </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;