'use client'
import { fetchLineRequestApi } from '~/service/linePay'
const payload = {
    amount: 100,
    currency: 'TWD',
    orderId: '00012',
    packages: [
        {
            id: '1',
            amount: 100,
            products: [
                {
                    id: 'PEN-B-001',
                    name: 'Pen Brown',
                    imageUrl: 'https://pay-store.line.com/images/pen_brown.jpg',
                    quantity: 2,
                    price: 50,
                },
            ],
        },
    ],
    redirectUrls: {
        confirmUrl: 'http://localhost:3000/payment/api',
        cancelUrl: 'http://localhost:3000/payment/api',
    },
}
const Card = () => {
    return (
        <form>
            <button
                formAction={() => fetchLineRequestApi(payload)}
                className="text-gray bg-gray-100 p-1 text-xl"
            >
                test
            </button>
        </form>
    )
}
export default Card
