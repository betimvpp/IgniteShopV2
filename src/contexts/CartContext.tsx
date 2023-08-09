import { ReactNode, createContext, useState } from "react"

export interface IProduct{
  id: string;
  name:string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData{
  cartItems: IProduct[];
  cartTotal: number;
  addToCart:(product: IProduct) => void;
  removeToCart:(productId: string) => void;
  checkIfItemAlreadyExists: (productId: string) => boolean;
}

interface CartContextProviderProps{ children: ReactNode; }

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({children}: CartContextProviderProps){
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct){
    setCartItems((state)=> [...state, product])
  }

  function removeToCart(productId: string){
    setCartItems((state)=>state.filter((item)=> item.id != productId));
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  return(
    <CartContext.Provider value={{cartItems, addToCart, removeToCart, cartTotal, checkIfItemAlreadyExists}}>
      {children}
    </CartContext.Provider>
  )
}