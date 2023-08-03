import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Image from "next/image"
import Logo from '../assets/logo.svg'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="antialiased mb-auto flex flex-col items-center justify-start min-h-screen bg-backtheme">
        <header className='px-8 py-0 w-full max-w-6xl mx-0 my-10'>
          <Link href={'/'}>
            <Image src={Logo} height={60} width={138} alt={''}/>
          </Link>
        </header>
      
     
      <Component {...pageProps} />
    </main>
  
  )
}
