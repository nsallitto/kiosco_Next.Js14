'use client'
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddButtonProps = {
    product: Product
}
export default function AddButon({product}: AddButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <button
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-800 p-3 mt-5 text-white font-bold uppercase cursor-pointer"
            onClick={()=>addToOrder(product)}
        >
            Agregar
        </button>
    )
}
