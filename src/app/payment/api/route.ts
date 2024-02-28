import { fetchLineConfirmApi } from "~/service/linePay"

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams
    const t = params.get('transactionId')
    if (t===null) return Response.error()
    const res =  await fetchLineConfirmApi(t)
    return Response.json(res)
}