import React from 'react'
import OrderSidebar from '@/components/order/OrderSidebar';
import OrderSumary from '@/components/order/OrderSumary';
import ToastNotification from '@/components/ui/ToastNotification';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className='md:flex '>
                <OrderSidebar />
                
                <main className='p-5 md:h-screen md:flex-1 md:overflow-y-scroll'>
                    {children}
                </main>

                <OrderSumary />
            </div>
            <ToastNotification />
        </>
    );
}
