import { Handbag } from 'phosphor-react'
import React, { ComponentProps } from 'react'
import { CartButtonContainer } from './styles';

type CartButtonProps = ComponentProps<typeof CartButtonContainer>;

export const CartButton = ({...rest}: CartButtonProps) => {
  return (
    <CartButtonContainer {...rest} className='flex items-center justify-center ml-auto border-none rounded-md relative bg-gray-800 text-gray-500 w-12 h-12 cursor-pointer disabled:cursor-not-allowed'>
      <Handbag className='text-2xl' weight='bold'/>
    </CartButtonContainer>
  )
}
