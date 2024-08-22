import { IMyPositionDataItem } from "@/types/my-position";

export const MyPositionListData: IMyPositionDataItem[] = [
  {
    id: 1,
    image: '/images/my-position-1.png',
    title: 'Will Gen.G Win VALORANT Champions Tour 2024?',
    datePurchased: new Date(),
    volume: 169400000,
    position: 'yes',
    amount: 50,
    potentialPrize: 500
  },
  {
    id: 2,
    image: '/images/my-position-2.png',
    title: 'Will China Have The Most Gold Medals In Paris 2024 Olympics?',
    datePurchased: new Date(),
    volume: 169400000,
    position: 'no',
    amount: 10,
    potentialPrize: 1000
  },
  {
    id: 3,
    image: '/images/my-position-3.png',
    title: 'Will Bitcoin Pass 70K USD In The End of A Year?',
    datePurchased: new Date(),
    volume: 169400000,
    position: 'yes',
    amount: 20,
    potentialPrize: 200
  }
]