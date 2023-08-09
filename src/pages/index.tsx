/* eslint-disable jsx-a11y/alt-text */
"use client"

import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import Link from 'next/link'
import Head from 'next/head'
import { CartButton } from '@/components/CartButton'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/contexts/CartContext'
import { MouseEvent } from 'react'


export interface HomeProps{
  products : IProduct[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides:{
      perView:3,
      spacing:48
    }
  })  

  const {addToCart, checkIfItemAlreadyExists } = useCart();

  function handleAddtoCart(e: MouseEvent<HTMLButtonElement>, product: IProduct){
    e.preventDefault();
    addToCart(product);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <div ref={sliderRef} className='keen-slider w-full flex flex-row max-w-calc min-h-656 mb-auto ml-auto overflow-hidden '>
      {products.map(product => {
        return(
          <Link 
          prefetch={false}
          key={product.id}
          href={`/Products/${product.id}`}>
            <div 
            className='keen-slider__slide group min-w-540 flex items-center overflow-hidden justify-center flex-col relative rounded-lg cursor-pointer bg-gradient-to-b from-cyan-500 from-0% to-purple-500 to-100%' >
              <Image className='object-cover' src={product.imageUrl} alt='' width={520} height={480}/>
                            
                <footer className='translate-y-full  opacity-0 transition-all ease-in-out duration-200 bg-black/60 p-8 absolute bottom-1 left-1 right-1 rounded-md flex items-center justify-between group-hover:translate-y-0 group-hover:opacity-100'>
                  <div className='flex flex-col gap-1'>
                    <strong className='text-lg text-gray-100 font-bold'>{product.name}</strong>
                    <span className='text-green-500 font-bold text-2xl'>{product.price}</span>
                  </div>
                  <CartButton 
                  color={'green'} 
                  size={'large'} 
                  onClick={(e)=> handleAddtoCart(e, product)}
                  disabled={checkIfItemAlreadyExists(product.id)}
                  />
                </footer>              
            </div>
          </Link>
        )
      })}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount!/100),
      numberPrice: price.unit_amount!/100,
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
