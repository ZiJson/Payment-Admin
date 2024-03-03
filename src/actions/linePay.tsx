'use server'
import type * as Prisma from '@prisma/client'
import { redirect } from 'next/navigation'
import { Interface } from 'readline'
import { fetchLineRequestApi } from '~/service/linePay'
import type { FetchLineRequestApiType } from '~/service/type'
import { addNewOrderToDB } from '~/server/data-access'

const REDIRECT_URL = {
    confirmUrl: 'http://localhost:3000/api',
    cancelUrl: 'http://localhost:3000/api',
}

export const checkoutWithLinePay = async (product: Prisma.Product) => {
    const payload: FetchLineRequestApiType = {
        amount: product.price,
        currency: 'TWD',
        orderId: Date.now().toString().slice(8),
        packages: [
            {
                id: '1',
                amount: product.price,
                products: [
                    {
                        id: product.id.toString(),
                        name: product.name,
                        imageUrl:
                            'https://pay-store.line.com/images/pen_brown.jpg',
                        quantity: 1,
                        price: product.price,
                    },
                ],
            },
        ],
        redirectUrls: {
            confirmUrl:
                REDIRECT_URL.confirmUrl +
                `?amount=${product.price}&currency=TWD`,
            cancelUrl: REDIRECT_URL.cancelUrl,
        },
    }
    const res = await fetchLineRequestApi(payload)
    console.log(res.info.paymentUrl)
    redirect(res.info.paymentUrl.web)
}
