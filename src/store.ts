import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const {categoryId, image, ...data} = product
        let order: OrderItem[] = []
        if (get().order.find(item => item.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: product.price
            }]
        }
        set(()=>({
            order
        }))
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price
        } : item )
        }))
    },
    decreaseQuantity: (id) => {
        const order: OrderItem[] = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.price
        } : item )
        set(() => ({
            order
        }))
    },
    removeItem: (id) => {
        const order: OrderItem[] = get().order.filter(items => items.id !== id)
        set(() => ({
            order
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))
