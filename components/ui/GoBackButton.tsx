"use client"
import { useRouter } from "next/navigation"

export default function GoBackButton() {

    const router = useRouter();

    return (
        <button
            onClick={() => { router.back() }}
            className="bg-amber-400 font-bold w-full lg:w-auto py-3 px-10 text-xl text-center cursor-pointer"
        >
            Volver
        </button>
    )
}
