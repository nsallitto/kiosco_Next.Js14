"use client"
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get("search")
        }
        const result = SearchSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => (
                toast.error(issue.message)
            ))
            return
        }
        redirect(`/admin/products/search?search=${result.data.search}`)
    }

    return (
        <form 
            action={handleSearchForm}
            className="flex items-center">
            <input 
                type="text" 
                placeholder="Buscar Producto"
                name="search"
                className="p-2 placeholder-gray-400 w-full"
            />
            <input 
                type="submit" 
                value={'Buscar'}
                className="bg-indigo-600 p-2 text-white uppercase cursor-pointer"
            />
        </form>
    )
}
