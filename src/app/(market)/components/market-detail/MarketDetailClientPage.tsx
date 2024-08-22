import MarketDetailChartCard from "./MarketDetailChartCard";
import MarketDetailCommentTopHolderCard from "./MarketDetailCommentTopHolderCard";
import MarketDetailDescriptionCard from "./MarketDetailDescriptionCard";
import MarketDetailOrderbookCard from "./MarketDetailOrderbookCard";
import MarketDetailPlaceOrderCard from "./MarketDetailPlaceOrderCard";
import MarketDetailRelatedHotPicksCard from "./MarketDetailRelatedHotPicksCard";
import MarketDetailRulesCard from "./MarketDetailRulesCard";

const MarketDetailClientPage = () => {
  return (
    <>
      <div className="w-full flex gap-4 py-4 relative">
        <div className="w-2/3 flex flex-col gap-4">
          <MarketDetailDescriptionCard />
          <MarketDetailChartCard />
          <MarketDetailOrderbookCard />
          <MarketDetailRulesCard />
          <MarketDetailRelatedHotPicksCard />
          <MarketDetailCommentTopHolderCard />
        </div>
        <div className="w-1/3 flex flex-col sticky top-[90px]">
          <MarketDetailPlaceOrderCard />
        </div>
      </div>
    </>
  )
}

export default MarketDetailClientPage;