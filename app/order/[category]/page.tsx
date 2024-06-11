import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/src/lib/prisma";
import Heading from "@/components/ui/Heading";

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    })
    return products
}

export default async function page({params}:{params: {category: string}}) {
    const products = await getProducts(params.category)
    
    return (
        <>
            <Heading>
                Elije y Personaliza tu pedido
            </Heading>

            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

        </>
    )
}
