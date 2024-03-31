import { useState, useMemo, useEffect } from "react"
import { db } from "../data/db"
import type { Guitar, cartItem } from "../types/index"

export const useCart = () => {

    const initialCart = () : cartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])

    function addToCart(item : Guitar){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExists < 0) {
        const newItem : cartItem = {...item, quantity : 1}
        setCart([...cart, newItem])
        }
        else {
        if (cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }
    }

    function removeFromCart(id : Guitar['id']){
        setCart(prevBag => prevBag.filter(product => product.id !== id))
    }

    function decreaseQuantity(id : Guitar['id']){
        const updatedCart = cart.map(product => {
        if(product.id === id && product.quantity > MIN_ITEMS) {
            return {
            ...product,
            quantity: product.quantity - 1
            }}
        return product
        })
        setCart(updatedCart)
    }
    
    function increaseQuantity(id : Guitar['id']){
        const updatedCart = cart.map(product => {
        if(product.id === id && product.quantity < MAX_ITEMS) {
            return {
            ...product,
            quantity: product.quantity + 1
            }}
        return product
        })
        setCart(updatedCart)
    }

  function clearCart(){
    setCart([])
  }

  
  const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.price * item.quantity), 0 ), [cart])
  const isEmpty = useMemo( () => cart.length === 0 , [cart] )

    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        cartTotal,
        isEmpty
    }
}