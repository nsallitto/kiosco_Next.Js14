'use client'
import { Category } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}
export default function CategoryIcon({category}: CategoryIconProps) {
    const params = useParams();
    
    return (
        <div
            className={`${category.slug === params.category ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border-t last-of-type:border-b border-gray-200`}
        >
            <div className="w-16 h-16 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt={`Imagen de ${category.name}`}
                />
            </div>
            <Link
                className="text-xl font-bold"
                href={`/order/${category.slug}`}
            >
                {category.name}
            </Link>




        </div>
    )
}
