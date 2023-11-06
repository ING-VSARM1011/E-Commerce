import { useContext } from "react";
import Layout from '../../Components/Layout'
import { Link } from "react-router-dom"
import OrdersCard from '../../Components/OrdersCard'
import { ShoppingCartContext } from "../../Context";

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-4">
        <h1 className="font-medium text-xl">MyOrders</h1>
      </div>
      {context.order.map((order, index) => (
        <>
          <Link to={`/my-orders/${index}`}>
            <OrdersCard
              key={index}
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        </>
      ))}
    </Layout>
  );
}

export default MyOrders;