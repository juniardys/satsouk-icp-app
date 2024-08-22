'use client';

import UserCard from "@/components/UserCard";
import { Divider } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import MyPositionItem from "./MyPositionItem";
import { getMyPositionList } from "@/contract-call/market";
import { IMyPositionDataItem } from "@/types/my-position";
import { useCrypto } from "@/context/CryptoContext";

const MyPositionClientPage: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount()
  const [domLoaded, setDomLoaded] = useState<boolean>(false);
  const [checkLoggedIn, setCheckLoggedIn] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [myPositionListData, setMyPositionListData] = useState<IMyPositionDataItem[]>([]);

  const { fetchPrice } = useCrypto();

  useEffect(() => {
    setDomLoaded(true)
  }, []);

  useEffect(() => {
    if (domLoaded) {
      fetchPrice('eth');
      setTimeout(() => {
        setCheckLoggedIn(true);
      }, 5000)
    }
  }, [domLoaded]);

  useEffect(() => {
    if (checkLoggedIn) {
      doCheckLoggedIn();
    }
  }, [checkLoggedIn])

  useEffect(() => {
    setIsLoggedIn(address ? true : false);

    if (address) {
      fetchMyPositionList();
    }
  }, [address])

  const doCheckLoggedIn = () => {
    if (!address) {
      router.push('/');
    } else {
      setIsLoggedIn(true);
    }
  }

  const fetchMyPositionList = async () => {
    const data = await getMyPositionList(address as any);
    setMyPositionListData(data);
  }

  if (!domLoaded || !isLoggedIn) {
    return <></>
  }

  return (
    <>
      <div className="w-full flex gap-4 py-4 relative">
        <div className="w-1/3 flex flex-col gap-4 sticky top-[90px]">
          <UserCard />
          {/* Will be used later */}
          {/* <UserStatisticsCard />
          <SidebarMenu /> */}
        </div>
        <div className="w-2/3 mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col bg-zinc-950 rounded-[24px] gap-6 p-6">
              <h2 className="text-lg font-medium">Your position</h2>
              <Divider className="!border-zinc-800 !m-0 z-10" />
              {myPositionListData.length > 0 ? (
                <>
                  {myPositionListData.map((item, index) => (
                    <div className="flex flex-col gap-6" key={index}>
                      {index > 0 && (<Divider className="!border-zinc-800 !m-0 z-10" />)}
                      <MyPositionItem data={item} />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="w-full flex justify-center items-center">
                    <h2 className="text-lg font-medium">No data found</h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPositionClientPage;