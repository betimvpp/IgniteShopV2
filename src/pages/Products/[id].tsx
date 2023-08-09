/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import { stripe } from "@/lib/stripe"
import { GetStaticPaths, GetStaticProps } from "next"

import Stripe from "stripe"
import Head from "next/head"
import { useCart } from "@/hooks/useCart"
import { IProduct } from "@/contexts/CartContext"

interface ProductProps{
  product : IProduct;
}

export default function Products  ({product}: ProductProps)  {
  const {addToCart, checkIfItemAlreadyExists} = useCart();

  const itemAlreadyExist = checkIfItemAlreadyExists(product?.id);

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

            <button 
            onClick={()=>addToCart(product)} 
            className="mt-auto w-full bg-green-500 border-none text-white rounded-lg p-5 cursor-pointer  font-bold text-lg enabled:hover:bg-green-600 enabled:duration-200  disabled:opacity-60 disabled:cursor-not-allowed" 
            disabled={itemAlreadyExist}>
              {itemAlreadyExist? 'Produto já está no carrinho' : 'Adcionar ao carrinho'}
              </button>
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
        numberPrice: price.unit_amount!/100,
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60*60
  }
}

