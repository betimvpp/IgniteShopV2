import React, { useState } from 'react'
import { CartButton } from '../CartButton'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import Image from "next/image"

import { useCart } from '@/hooks/useCart'
import axios from 'axios'

export function Cart  ()  {
  const{cartItems, removeToCart, cartTotal} = useCart();
  const cartQuantity = cartItems.length;

  const formattedCartTotal = new Intl.NumberFormat('pt-BR',{
    style: 'currency',
    currency:'BRL',
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  
  async function handleCheckout( ) {
    try{
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout",{
        products: cartItems,
      });

      const{checkoutUrl} = response.data;

      window.location.href = checkoutUrl;
    }catch(err){
      setIsCreatingCheckoutSession(false)
      alert()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className='fixed top-0 right-0 bottom-0 w-480 p-12 pt-18 shadow-cart flex flex-col bg-gray-800'>
          <Dialog.Close className='flex items-center justify-center text-center bg-none border-none text-gray-100 cursor-pointer absolute top-7 right-7 bg-red-500 hover:bg-red-600 duration-200'>
            <X size={24} weight='bold'/>
          </Dialog.Close>

          <h2 className='font-bold text-lg text-gray-100 mb-8'>Carrinho de Compras</h2>

          <section className='flex flex-col gap-6 flex-1 overflow-y-auto '>
            {cartQuantity<=0 && 
              <p>Parece que seu carrinho está vazio :(</p>
            }
            
            {/*cart product*/}
            {cartItems.map((cartItem)=>(
              <div key={cartItem.id} className='w-full flex gap-5 items-center h-93'>
              {/*cart product image */}
              <div className='h-93 w-101 flex justify-center items-center rounded-lg bg-gradient-to-b from-cyan-500 from-0% to-purple-500 to-100%'>
                <Image className='object-cover' src={cartItem.imageUrl} alt={''} width={101} height={93}/>
              </div>

              {/*cart product details */}
              <div className='flex flex-col h-full'>
                <p className='text-gray-100 text-lg'>{cartItem.name}</p>

                <strong className=' text-lg font-bold text-green-500'>{cartItem.price}</strong>

                <button onClick={()=>removeToCart(cartItem.id)} className='mt-auto w-max border-none bg-transparent cursor-pointer text-red-500 text-base font-bold'>Remover</button>
              </div>
            </div>
            ))}
          </section>

          {/*cart finalization */}
          <div className='flex flex-col mt-auto'>
            {/*cart finalization details*/}
            <section className='flex flex-col gap-2 mb-14'>
              <div className='flex items-center justify-between'>
                <span>Quantidade</span>
                <p className='text-base text-gray-300 '>{cartQuantity} {cartQuantity ===1 ? 'item' : 'itens'}</p>
              </div>
              <div className='flex items-center justify-between font-bold'>
                <span className='text-base'>Subtotal</span>
                <p className='text-xl text-gray-100 '>{formattedCartTotal}</p>
              </div>
            </section>
            <button
              disabled={isCreatingCheckoutSession || cartQuantity<=0}
              onClick={handleCheckout} 
              className='w-full bg-green-500 text-white text-base h-69 border-none rounded-lg font-bold hover:bg-green-600 duration-200 cursor-pointer ?disabled:opacity-60 disabled:cursor-not-allowed'>
              Finalizar compra
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
