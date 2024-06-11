'use client'
import { useStore } from "@/src/store"
import { toast } from "react-toastify"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-actions"
import { OrderSchema } from "@/src/schema"


export default function OrderSumary() {
    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)
    const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0),[order])

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            total,
            order
        }
        const result = OrderSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }
        const response = await createOrder(data)
        if (response?.error) {
            response.error.forEach((issue) => {
                toast.error(issue.message)
            })
        }
        toast.success('Tu Orden se creo correctamente')
        clearOrder()
    }
    
    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl font-black text-center">Mi pedido</h1>

            {order.length === 0 ? <p className="my-10 text-center">El carrito esta vacio</p> : 
                <div className="mt-5">
                    {order.map(item => (
                        <ProductDetails 
                            key={item.id}
                            item={item}
                        />
                    ))}
                    <p className="text-2xl mt-20 text-center">
                        Total a pagar:
                        <span className="font-bold">{formatCurrency(total)}</span>
                    </p>
                    <form
                    action={handleCreateOrder}
                    className="w-full mt-10 space-y-5"
                    >   
                        <input
                        type="text" 
                        placeholder="Tu Nombre"
                        className="bg-white w-full p-2 border border-gray-100"
                        name="name"
                        />
                        <input 
                            type="submit" 
                            value="Confirmar Pedido"
                            className="bg-black text-white w-full py-2 rounded-lg text-center uppercase cursor-pointer font-bold"
                        />
                    </form>
                </div>
            }
        </aside>
    )
}
