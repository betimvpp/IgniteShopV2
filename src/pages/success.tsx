import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { redirect } from 'next/dist/server/api-utils'
import Head from 'next/head'

interface SuccessProps{
  customerName: string;
  product:{
    name: string;
    imageUrl: string;
  }
}

export default function success  ({customerName, product}:SuccessProps)  {
  return (
    <>
    <Head>
      <title>Compra efetuada com sucesso | Ignite Shop</title>
      <meta name='robots' content='noindex'/>
    </Head>
    <div className='min-h-474 w-full max-w-xl text-center flex flex-col items-center justify-between mb-auto'>
      <h1 className='font-bold text-price text-gray-100'>Compra efetuada</h1>
      <div className='w-32 h-36 flex flex-col items-center justify-center rounded-lg bg-gradient-to-b from-cyan-500 from-0% to-purple-500 to-100%'>
        <Image className='object-cover' src={product.imageUrl} alt={''} width={114} height={110}/>
      </div>

      <p className='text-2xl font-normal'>Uhuul <strong>{customerName}</strong> , sua <strong>{product.name}</strong>  já está a caminho da sua casa. </p>

      <Link className='text-xl text-green-500 no-underline hover:text-green-600 duration-200' href={'/'}>
        Voltar ao catálogo
      </Link> 
    </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query, params})=>{
  if(!query.session_id){
    return{
      redirect:{
        destination:'/',
        permanent: false
      }
    }
  }
  const sessionId = String(query.session_id);
  const session = await stripe.checkout.sessions.retrieve(sessionId,{
    expand:['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details!.name;
  const product = session.line_items!.data[0].price!.product as Stripe.Product

    return{
    props:{
      customerName,
      product: {
        name : product.name,
        imageUrl: product.images[0]
      }
    }
  }
}
