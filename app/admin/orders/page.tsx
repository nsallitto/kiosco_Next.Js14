import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
// import { OrderWithProducts } from "@/src/types";
import { revalidatePath } from "next/cache";
// import useSWR from "swr";

async function getPendingOrders() {
    const orders = await prisma.order.findMany({
        where: {
            status: false
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return orders
}

export default async function page() {

    const orders = await getPendingOrders();

    const refreshOrders = async() => {
        "use server"
        revalidatePath('/admin/orders')
    }

    // //obtenemos las ordenes a travez de SWR. Consulta por segundo en este caso (1000) por eso desabilitamos y actualizamos con 
    // //form action a travez del boton
    // // SWR solo funciona "useClient" y consulta a la API que solo creamos para este ejemplo
    // const url = '/admin/orders/api'
    // const fetcher = () => fetch(url).then((res) => res.json).then((data) => data)
    // const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    //     refreshInterval: 1000,
    //     revalidateOnFocus: false
    // })

    return (
        <>
            <Heading>Administrar Ordenes</Heading>

            <form action={refreshOrders}>
                <input 
                    type="submit" 
                    value='Actualizar Ordenes'
                    className="bg-amber-400 font-bold w-full lg:w-auto py-3 px-10 text-xl text-center cursor-pointer"
                />
            </form>

            {
            orders.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
                    {orders.map((order) => (
                        <OrderCard 
                            key={order.id}
                            order={order}
                        />
                    ))}
                </div>
            ) : (
                <p className='text-center'>No hay órdenes pendientes</p>
            )}
        </>
    )
}
