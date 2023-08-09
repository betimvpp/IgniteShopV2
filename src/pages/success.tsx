import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'
import { ImagesContainer } from '@/styles/success'

interface SuccessProps{
  customerName: string;
  productsImages: string[];
}

export default function success  ({customerName, productsImages}:SuccessProps)  {
  return (
    <>
    <Head>
      <title>Compra efetuada com sucesso | Ignite Shop</title>
      <meta name='robots' content='noindex'/>
    </Head>

    
    <div className='min-h-474 w-full max-w-xl text-center flex flex-col items-center justify-between mb-auto'>
      <h1 className='font-bold text-price text-gray-100'>Compra efetuada</h1>
      
      <ImagesContainer className='flex items-center mb-12 gap-2'>
        {productsImages.map((image, i)=>(
          <div key={i} className='w-36 h-36 shadow-success relative flex items-center justify-center rounded-full bg-gradient-to-b from-cyan-500 from-0% to-purple-500 to-100%'>
          <Image className='object-cover' src={image} alt={''} width={114} height={110}/>
        </div>
        ))}
      </ImagesContainer>
        <p className='text-2xl font-normal'>Uhuul <strong>{customerName}</strong> , sua compra de <strong>{productsImages.length} camisetas</strong>  já está a caminho da sua casa. </p>

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
  const productsImages = session.line_items?.data.map((item)=>{
    const product = item.price?.product as Stripe.Product;
    return product.images[0]
  })

    return{
    props:{
      customerName,
      productsImages
    }
  }
}
