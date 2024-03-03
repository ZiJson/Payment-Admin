import { getProductFromDB, getOrdersFromDB } from '~/server/data-access'
import ProductCard from './_components/ProductCard'
import OrderCard from './_components/OrderCard'

const Dashboard = async () => {
    const products = await getProductFromDB()
    const orders = await getOrdersFromDB()
    return (
        <div className=" container flex h-screen flex-col justify-around py-10">
            <div className=" flex w-full gap-5 overflow-auto">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
            <div className=" flex w-full gap-5 overflow-auto">
                {orders.map((item) => (
                    <OrderCard key={item.id} order={item} />
                ))}
            </div>
        </div>
    )
}
export default Dashboard
