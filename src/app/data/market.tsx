import { IMarketDataItem } from "@/types/market";

export const MarketListData: IMarketDataItem[] = [
  {
    id: 1,
    image: '/images/market-1.png',
    title: 'Will Gen.G Win VALORANT Champions Tour 2024?',
    category: 'gaming',
    isAIPick: true,
    type: 'binary',
    options: [
      {
        label: 'yes',
        percentage: 88,
        volume: 104100000,
      },
      {
        label: 'no',
        percentage: 12,
        volume: 20300000,
      }
    ],
    totalComments: 107,
    totalLikes: 1700,
    volume: 169400000,
  },
  {
    id: 2,
    image: '/images/market-2.png',
    title: 'Will China Have The Most Gold Medals In Paris 2024 Olympics?',
    category: 'trending',
    isAIPick: true,
    type: 'binary',
    options: [
      {
        label: 'yes',
        percentage: 30,
        volume: 20300000,
      },
      {
        label: 'no',
        percentage: 70,
        volume: 104100000,
      },
    ],
    totalComments: 107,
    totalLikes: 1700,
    volume: 169400000,
  },
  {
    id: 3,
    image: '/images/market-3.png',
    title: 'Will Bitcoin Pass 70K USD In The End of A Year?',
    category: 'trending',
    isAIPick: true,
    type: 'binary',
    options: [
      {
        label: 'yes',
        percentage: 50,
        volume: 104100000,
      },
      {
        label: 'no',
        percentage: 50,
        volume: 104100000,
      },
    ],
    totalComments: 107,
    totalLikes: 1700,
    volume: 169400000,
  },
  {
    id: 4,
    image: '/images/market-4.png',
    title: 'USA Presidential Election Winner 2024',
    category: 'trending',
    isAIPick: true,
    type: 'selection',
    options: [
      {
        label: 'Donald Trump',
        percentage: 44,
        volume: 104100000,
      },
      {
        label: 'Joe Biden',
        percentage: 32,
        volume: 104100000,
      },
      {
        label: 'Kamala Harris',
        percentage: 24,
        volume: 104100000,
      },
    ],
    totalComments: 107,
    totalLikes: 1700,
    volume: 169400000,
  },
  // {
  //   image: 'https://s3-alpha-sig.figma.com/img/8f61/5a73/14964684a1acc070c5836a0607abc518?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KGsPjKWnc3~FjGQZmp~pZztrzFvVpLKx819X8eVCsYGmEcjXe03zZ5rVxsjIipNjytkY0aM2PSGKwNRqFzzlXgNQ18jA9avrGqNXZYv0QTe~b7V4OBVbVKtbaeiYvaySHrUv5uAMmHUEH-so3I~wKi82gmR961qKgXTKsfhhPKANKuBHlewS2osqoZdjgmE37LY7Vn9rwCsKcr0BWwaCQ1XJS2~~2dsgTYPr2WCzoB~IvjOGFCig3CNXQM0Vr7lXpr-yYaIvke6RCg8i8X-mWdaOR3Erj75~9BMm9strlJHs0ncARycJv005-aM0kbPLsbnknqVrCmiUNKofDjFkSg__',
  //   title: 'What Is The Best Soccer Team In The World?',
  //   slug: 'what-is-the-best-soccer-team-in-the-world',
  //   category: 'gaming',
  //   isAIPick: true,
  //   type: 'selection',
  //   selectionOptions: [
  //     {
  //       label: 'Paper Rex',
  //       percentage: 10.44,
  //     },
  //     {
  //       label: 'Evil Geniuses',
  //       percentage: 9.60,
  //     },
  //     {
  //       label: 'Sentinels',
  //       percentage: 8.35,
  //     },
  //     {
  //       label: '100 Thieves',
  //       percentage: 7.83,
  //     },
  //     {
  //       label: 'Fnatic',
  //       percentage: 7.72,
  //     },
  //     {
  //       label: 'Cloud9',
  //       percentage: 7.36,
  //     },
  //     {
  //       label: 'Team Liquid',
  //       percentage: 6.79,
  //     },
  //     {
  //       label: 'Team SoloMid',
  //       percentage: 6.48,
  //     },
  //     {
  //       label: 'Virtus.Pro',
  //       percentage: 6.36,
  //     },
  //     {
  //       label: 'Team Five',
  //       percentage: 6.35,
  //     }
  //   ],
  //   totalComments: 207,
  //   totalLikes: 2700,
  //   volume: 169400000,
  // }
];