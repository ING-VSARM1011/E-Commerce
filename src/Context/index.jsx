import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {

    // Shopping Cart: Increment Quantity
    const [count, setCount] = useState(0)

    // Product Detail: Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    // Checkout Side Menu: Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail: Show Product
    const [productToShow, setProductToShow] = useState({})

    // Shopping Cart: Add products to cart
    const [carProduct, setCarProduct] = useState([])

    // Shopping Cart: Order
    const [order, setOrder] = useState([])

    // Get products
    const [products, setProducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState(null)

    // Get products by title
    const [searchByTitle, setSearchByTitle] = useState("")

    // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }, []);

    const filteredProductsByTitle = (products, searchByTitle) => {
        return products?.filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()) )
    }

    const filteredProductsByCategory = (products, searchByCategory) => {
        return products?.filter(product => product.category.toLowerCase().includes(searchByCategory.toLowerCase()) )
    }

    const filterBy = (
      searchType,
      products,
      searchByTitle,
      searchByCategory
    ) => {
      if (searchType === "byTitle") {
        return filteredProductsByTitle(products, searchByTitle);
      }
      if (searchType === "byCategory") {
        return filteredProductsByCategory(products, searchByCategory);
      }
      if (searchType === "byTitleAndCategory") {
        return filteredProductsByCategory(products, searchByCategory).filter(product => product.title.toLowerCase().includes(searchByTitle.toLowerCase()) );
      }
      if (!searchType) {
        return products;
      }
    };

    useEffect(() => {
        if (searchByTitle && !searchByCategory) setFilteredProducts(filterBy("byTitle", products, searchByTitle, searchByCategory));
        if (searchByCategory && !searchByTitle) setFilteredProducts(filterBy("byCategory", products, searchByTitle, searchByCategory));
        if (!searchByCategory && !searchByTitle) setFilteredProducts(filterBy(null, products, searchByTitle, searchByCategory));
        if (searchByCategory && searchByTitle) setFilteredProducts(filterBy("byTitleAndCategory", products, searchByTitle, searchByCategory));
    }, [products, searchByTitle, searchByCategory]);

    return(
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            carProduct,
            setCarProduct,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            products, 
            setProducts,
            searchByTitle, 
            setSearchByTitle,
            filteredProducts,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}