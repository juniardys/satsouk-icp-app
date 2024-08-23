import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

interface CryptoContextProps {
  price: number | null;
  error: string | null;
  fetchPrice: (cryptoSymbol: string) => Promise<void>;
}

// const COINMARKETCAP_API_URL =
//   "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";
// const API_KEY = process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || "";
const API_KEY = '3c77ae3fd3c6e6da1cf0f44cdff18d57';

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

export const CryptoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const FETCH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

  const fetchPrice = async (cryptoSymbol: string) => {
    const now = Date.now();
    if (now - lastFetch < FETCH_INTERVAL_MS) {
      // Prevent fetching too frequently
      return;
    }
    try {
      const vsCurrency = 'usd';
      if (!cryptoSymbol) throw new Error("Invalid crypto symbol");

      // const response = await axios.get(COINMARKETCAP_API_URL, {
      //   headers: {
      //     "X-CMC_PRO_API_KEY": API_KEY,
      //     Accept: "application/json",
      //   },
      //   params: {
      //     symbol: cryptoSymbol.toUpperCase(), // Symbol should be in uppercase
      //     convert: vsCurrency.toUpperCase(),
      //   },
      // });

      // console.log('response', response)

      // const cryptoData = response.data.data[cryptoSymbol.toUpperCase()];

      // if (!(cryptoData && cryptoData[0])) {
      //   throw new Error("Cryptocurrency not found");
      // }

      // setPrice(cryptoData[0].quote[vsCurrency.toUpperCase()].price || 0);
      // setError(null);
      // setLastFetch(now);

      const response = await axios.get(`https://tysiw-qaaaa-aaaak-qcikq-cai.icp0.io/get_xrc_data_with_proof?id=${cryptoSymbol.toUpperCase()}/USD&api_key=${API_KEY}`);

      const cryptoData = response.data;
      const price = cryptoData.data.rate / Math.pow(10, cryptoData.data.decimals);

      setPrice(price);
      setError(null);
      setLastFetch(now);
    } catch (err) {
      console.error('Error fetching cryptocurrency price:', (err as any)?.message);
      setError('Failed to fetch cryptocurrency price');
      setPrice(null);
    }
  };

  return (
    <CryptoContext.Provider value={{ price, error, fetchPrice }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
