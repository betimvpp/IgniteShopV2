import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Header} from '@/components/Header'
import { CartContextProvider } from '@/contexts/CartContext'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <main className="antialiased mb-auto flex flex-col items-center justify-start min-h-screen bg-backtheme">     
        <Header />
        <Component {...pageProps} />
      </main>
    </CartContextProvider>
  )
}
