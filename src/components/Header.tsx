import type { Guitar, cartItem } from "../types/index"
type HeaderProps = {
    cart: cartItem[];
    removeFromCart: (id: Guitar['id']) => void
    increaseQuantity: (id: Guitar['id']) => void
    decreaseQuantity: (id: Guitar['id']) => void
    clearCart: () => void
    cartTotal: number
    isEmpty: boolean
}

function Header({cart, removeFromCart, increaseQuantity, 
    decreaseQuantity, clearCart, cartTotal, isEmpty} : HeaderProps ) {

  return (
    <div className="h-32 md:h-52">
        <img className="h-32 md:h-52 absolute w-screen object-cover" src="/img/header.jpg" alt="background"/>
        <div className="h-32 md:h-52 relative bg-black/75 flex items-center">
        
            <div className="px-4 md:px-0 w-full flex justify-between max-w-4xl mx-auto">
                <div className="relative">
                    <img className="w-36 md:w-56" src="/img/logo.svg" alt="logo de Guitarla instrumentos y cursos" />
                </div>

            <div className="relative flex items-center group">
                
                <img className="w-10 md:w-14 cursor-pointer" src="/img/carrito.png" alt="carrito de compras"/>
                
                <div className="absolute top-8 -left-64 lg:-left-80 z-10 hidden group-hover:block bg-neutral-100 rounded-lg max-h-[500px] shadow-lg lg:max-h-[700px] overflow-y-auto">
                    
                    {isEmpty ? (<div className="flex items-center text-center font-semibold text-xl">
                                    <h3 className="w-64 lg:w-96 h-20 pt-6">Tu bolsa está vacía <i className='bx bx-confused'></i></h3>
                                </div>
                            ):(
                            <>   
                            <table>
                                <thead>
                                    <tr>
                                        <th className="p-1 lg:px-4 lg:py-2">Imagen</th>
                                        <th className="p-1 lg:px-4 lg:py-2">Nombre</th>
                                        <th className="p-1 lg:px-4 lg:py-2">Precio</th>
                                        <th className="p-1 lg:px-4 lg:py-2">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map(guitar => (
                                    <tr key={guitar.id} className="text-center">
                                        <td className="p-1 lg:px-4 lg:py-2"><img className="w-10 mx-auto" src={`./img/${guitar.image}.jpg`} alt={`Foto de la guitarra modelo ${guitar.name}`} /></td>
                                        <td className="p-1 lg:px-4 lg:py-2 text-sm">{guitar.name}</td>
                                        <td className="p-1 lg:px-4 lg:py-2">{guitar.price}</td>
                                        <td className="p-1 lg:px-4 lg:py-2">
                                        <button
                                            type="button"
                                            className="w-4 mr-1 bg-black text-white"
                                            onClick={() => {decreaseQuantity(guitar.id)}}>
                                            -
                                        </button>
                                        {guitar.quantity}
                                        <button
                                            type="button"
                                            className="w-4 ml-1 bg-black text-white"
                                            onClick={() => {increaseQuantity(guitar.id)}}>
                                            +
                                        </button>
                                        </td>
                                        <td>
                                        <i className='bx bx-x bg-red-600 p-1 lg:mr-2 rounded-full text-white'
                                        onClick={() => removeFromCart(guitar.id)}
                                        ></i>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        <div className="bg-neutral-300 mt-4">
                            <p className="pl-4 py-4">Total: <strong>$ {cartTotal}</strong></p>

                            <button 
                                className="w-full py-4 bg-black text-white"
                                onClick={clearCart}
                            >Vaciar Carrito</button>

                        </div>
                    </>)} 
                    
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}

export default Header