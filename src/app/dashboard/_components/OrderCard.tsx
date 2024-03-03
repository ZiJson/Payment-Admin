import type * as Prisma from '@prisma/client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'

type prop = Prisma.Order & {
    products: Prisma.Product[]
}

const OrderCard = ({ order }: { order: prop }) => {
    const date = new Date(order.createdAt).toLocaleString()
    return (
        <Card className=" w-70">
            <CardHeader>
                <CardTitle>Order No. {order.id}</CardTitle>
                <CardDescription>$ {order.amount}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul>
                    {order.products.map((product) => (
                        <li>{product.name}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>{date}</CardFooter>
        </Card>
    )
}

export default OrderCard
