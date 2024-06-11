import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";


async function getCategories() {
    return await prisma.category.findMany()
}

export default async function OrderSidebar() {
    const categories = await getCategories(); 

    return (
        <aside className="md:w-72 bg-white md:h-screen">
            <Logo />
            <nav>
                {categories.map(category => (
                    <CategoryIcon 
                        key={category.id}
                        category={category}
                    />
                ))}
            </nav>
        </aside>
    )
}
