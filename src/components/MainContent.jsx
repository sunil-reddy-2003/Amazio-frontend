import PRODUCTS from "./products";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";

const MainContent = () => {
  const { searchText } = useOutletContext();

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-8 py-4">
      {filteredProducts.length ? (
        filteredProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-full text-gray-300 text-3xl">
          No products found for "{searchText}"
        </div>
      )}
    </div>
  );
};

export default MainContent;
