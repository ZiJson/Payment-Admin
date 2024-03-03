import { db } from '../src/server/db'

async function main() {
    await db.product.upsert({
        where: {
            id: 1,
        },
        create: {
            id: 1,
            name: 'Product for Test',
            description:
                'This is a product for testing, you can buy it to gothrough the whole proccess.',
            price: 100,
        },
        update: {},
    })
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })
