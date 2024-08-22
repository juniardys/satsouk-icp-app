export interface IMarketTabsMenuItem {
  slug: string;
  label: string;
  image?: string;
}

export interface IMarketOption {
  label: string;
  percentage: number;
  volume: number;
}

export interface IMarketDataItem {
  id: number;
  image: string;
  title: string;
  category: string;
  isAIPick?: boolean;
  type: "binary" | "selection";
  options?: IMarketOption[];
  totalComments?: number;
  totalLikes?: number;
  volume?: number;
  executionTime?: Date;
  expirationDate?: Date;
}
