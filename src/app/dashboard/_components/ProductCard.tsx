'use client'
import type * as Prisma from '@prisma/client'
import { checkoutWithLinePay } from '~/actions/linePay'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Button } from '~/components/ui/button'

const ProductCard = ({ product }: { product: Prisma.Product }) => {
    return (
        <Card className=" w-80">
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>$ {product.price}</CardDescription>
            </CardHeader>
            <CardContent>{product.description}</CardContent>
            <CardFooter>
                <Button
                    className=" w-full"
                    onClick={() => {
                        checkoutWithLinePay(product)
                    }}
                >
                    BUY
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
