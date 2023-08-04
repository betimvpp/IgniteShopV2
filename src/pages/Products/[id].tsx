/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import { stripe } from "@/lib/stripe"
import { GetStaticPaths, GetStaticProps } from "next"

import Stripe from "stripe"
import axios from "axios"
import { useState } from "react"
import Head from "next/head"

interface ProductProps{
  product : {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Products  ({product}: ProductProps)  {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

 async function handleCheckout (){
  try {
    setIsCreatingCheckoutSession(true)

    const response = await axios.post('/api/checkout',{
      priceId: product.defaultPriceId,
    })

    const {checkoutUrl} = response.data;

    window.location.href = checkoutUrl
  }catch(err){
    setIsCreatingCheckoutSession(false)

    alert(err + 'Falha ao redirecionar ao checkou!')
  }
 }

  return (
    <>
      <Head>
        <title>{product?.name} | Ignite Shop</title>
      </Head>

      <div className="h-full min-h-656 grid grid-cols-2 mb-auto grid-rows-1 items-stretch gap-16 max-w-6xl w-full">   
          {/* Image Container */}
          <div className="max-w-xl w-full h-656 flex items-center overflow-hidden justify-center flex-col p-1 relative rounded-lg bg-gradient-to-b from-cyan-500 from-0% to-purple-500 to-100%">
            <Image className="object-cover" src={product?.imageUrl} alt={""}  width={520} height={480}/>
          </div>
          {/* Details Container */}
          <div className="p-4 pb-0 flex flex-col">
            <div>
              <h1 className="font-bold text-3xl mb-4">{product?.name}</h1>
              <h2 className="text-green-500 mb-10 text-price ">{product?.price}</h2>
            </div>
            
            <p className="text-lg text-gray-300 leading-7">
            {product?.description}
            </p>

            <button onClick={handleCheckout} className="mt-auto w-full bg-green-500 border-none text-white rounded-lg p-5 cursor-pointer  font-bold text-lg enabled:hover:bg-green-600 enabled:duration-200  disabled:opacity-60 disabled:cursor-not-allowed" disabled={isCreatingCheckoutSession}>Comprar Agora</button>
          </div>
      </div>
   </>
  )
}

export const getStaticPaths: GetStaticPaths =async () => {
  return{
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId,{
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price;

  return{
    props:{
      product:{
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
        }).format(price.unit_amount!/100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60*60
  }
}

