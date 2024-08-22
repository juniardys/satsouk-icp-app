'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from './chakra-theme'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { wagmiConfig } from '@/config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import CustomAvatar from '@/components/CustomAvatar'
import { CryptoProvider } from '@/context/CryptoContext'

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#27272A',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          avatar={CustomAvatar}
        >
          <ChakraProvider theme={chakraTheme}>
            <AntdRegistry>
              <CryptoProvider>
                {children}
              </CryptoProvider>
            </AntdRegistry>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}