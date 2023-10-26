import { useContext } from "react";
import { Link } from "react-router-dom"
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import totalPrice from "../../Utils"
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.carProduct.filter(product => product.id != id);
    context.setCarProduct(filteredProducts);
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01-02-2023",
      products: context.carProduct,
      totalProducts: context.carProduct.length,
      totalPrice: totalPrice(context.carProduct)
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCarProduct([]);
  }

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-red-500 cursor-pointer"
            onClick={() => {
              context.closeCheckoutSideMenu();
            }}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {context.carProduct.map((product) => (
          <>
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              handleDelete={handleDelete}
            />
          </>
        ))}
      </div>
      <div className="px-6 mb-6">
          <p className="flex justify-between items-center mb-2">
            <span className="font-ligth">Total</span>
            <span className="font-medium text-2xl">${totalPrice(context.carProduct)}</span>
          </p>
          <Link to="/my-orders/last">
            <button className="w-full bg-black py-3 text-white rounded" onClick={() => handleCheckout()}>Checkout</button>
          </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
