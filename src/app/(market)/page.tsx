import { Suspense } from "react";
import MarketClientPage from "./components/MarketClientPage";

export default async function MarketPage() {
  return (
    <>
      <Suspense>
        <MarketClientPage />
      </Suspense>
    </>
  );
}
