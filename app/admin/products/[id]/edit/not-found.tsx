import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center mr-10">
            <Heading>Producto no encontrado</Heading>
            <Link
                className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
                href={'/admin/products'}
            >Ir a Productos</Link>
        </div>
    )
}
