import { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

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
      <div className="px-6 overflow-y-scroll">
        {context.carProduct.map((product) => (
          <>
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
            />
          </>
        ))}
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
