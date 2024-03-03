'use server'
import { env } from '~/env'
import * as crypto from 'crypto'
import path from 'path'
import type { FetchLineRequestApiType, FetchLineConfirmApiType } from './type'

const BASE_URL_SANDBOX = 'https://sandbox-api-pay.line.me'
const BASE_URL = 'https://api-pay.line.me'
const REQUEST_URL = '/v3/payments/request'
const COMFIRM_URL = '/v3/payments/{transactionId}/confirm'

const REDIRECT_URL = {
    confirmUrl: 'http://localhost:3000/api',
    cancelUrl: 'http://localhost:3000/api',
}

const getSignature = (url: string, body: string, nonce: crypto.UUID) => {
    const signature = crypto
        .createHmac('sha256', env.LINE_CHANNEL_SECRET_KEY)
        .update(env.LINE_CHANNEL_SECRET_KEY + url + body + nonce)
        .digest('base64')
    return signature
}

const fetchLineRequestApi = async (payload: FetchLineRequestApiType) => {
    const nonce = crypto.randomUUID()
    const body = JSON.stringify({ ...payload })
    const signature = getSignature(REQUEST_URL, body, nonce)
    console.log(signature)
    const res = await fetch(new URL(REQUEST_URL, BASE_URL_SANDBOX).toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-LINE-ChannelId': env.LINE_CHANNEL_ID,
            'X-LINE-Authorization-Nonce': nonce,
            'X-LINE-Authorization': signature,
        },
        body,
    })
    if (res.ok) return await res.json()
}

const fetchLineConfirmApi = async (prop: FetchLineConfirmApiType) => {
    const { amount, transactionId, currency } = prop
    const nonce = crypto.randomUUID()
    const urlPath = COMFIRM_URL.replace('{transactionId}', transactionId)
    const body = {
        amount,
        currency,
    }
    const signature = getSignature(urlPath, JSON.stringify(body), nonce)
    const res = await fetch(new URL(urlPath, BASE_URL_SANDBOX).toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-LINE-ChannelId': env.LINE_CHANNEL_ID,
            'X-LINE-Authorization-Nonce': nonce,
            'X-LINE-Authorization': signature,
        },
        body: JSON.stringify(body),
    })
    if (res.ok) return await res.json()
}

export { fetchLineRequestApi, fetchLineConfirmApi }
