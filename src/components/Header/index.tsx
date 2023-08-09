import React from 'react'
import Image from "next/image"
import Logo from '@/assets/logo.svg'
import Link from 'next/link'
import { Cart } from '../Cart'

export const Header = () => {
  return (
    <header className='px-8 py-0 w-full max-w-6xl mx-0 my-auto flex items-center justify-center'>
      <Link href={'/'}>
        <Image src={Logo} height={60} width={138} alt={''}/>
      </Link>
      < Cart/>
    </header>
  )
}
