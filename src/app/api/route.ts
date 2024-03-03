import { fetchLineConfirmApi } from '~/service/linePay'
import { addNewOrderToDB } from '~/server/data-access'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams
    const transactionId = params.get('transactionId')
    const amount = +(params.get('amount') || 0)
    const currency = params.get('currency') || 'TWD'
    if (transactionId === null) return Response.error()
    const res = await fetchLineConfirmApi({ transactionId, amount, currency })
    const id = +(params.get('orderId') || res.info.orderId)
    const productIds = res.info.packages.map((item: any) => +item.id)
    const dbRes = await addNewOrderToDB({
        id,
        amount,
        productIds,
    })
    console.log(dbRes)

    redirect('/dashboard')
}
