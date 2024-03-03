import { db } from './db'
import type * as Prisma from '@prisma/client'

const getProductFromDB = async () => {
    const products = await db.product.findMany()
    return products
}
const getOrdersFromDB = async () => {
    const orders = await db.order.findMany({
        include: {
            products: true,
        },
    })
    return orders
}

type AddNewOrderToDBType = {
    id: number
    productIds: number[]
    amount: number
}

const addNewOrderToDB = async (prop: AddNewOrderToDBType) => {
    const order = await db.order.create({
        data: {
            id: prop.id,
            amount: prop.amount,
            products: {
                connect: prop.productIds.map((id) => ({ id })),
            },
        },
    })
    return order
}

export { getProductFromDB, getOrdersFromDB, addNewOrderToDB }
