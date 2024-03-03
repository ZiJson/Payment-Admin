import { z } from 'zod'

const LineProduct = z.object({
    id: z.string().max(50).optional(),
    name: z.string().max(4000),
    imageUrl: z.string().url().optional(),
    quantity: z.number().nonnegative(),
    price: z.number().nonnegative(),
    originalPrice: z.number().optional(),
})

const LinePackage = z.object({
    id: z.string().max(50),
    amount: z.number(),
    userFee: z.number().optional(),
    name: z.string().max(100).optional(),
    products: z.array(LineProduct),
})

const FetchLineRequestApiSchema = z.object({
    amount: z.number(),
    currency: z.string().max(3),
    orderId: z.string().max(100),
    packages: z.array(LinePackage),
    redirectUrls: z
        .object({
            confirmUrl: z.string().url(),
            cancelUrl: z.string().url(),
        })
        .optional(),
})

export type FetchLineRequestApiType = z.input<typeof FetchLineRequestApiSchema>

const FetchLineConfirmApiSchema = z.object({
    amount: z.number(),
    currency: z.string().max(3),
    transactionId: z.string().length(19),
})

export type FetchLineConfirmApiType = z.input<typeof FetchLineConfirmApiSchema>
