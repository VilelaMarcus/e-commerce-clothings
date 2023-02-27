import { useContext } from 'react';
import { ProductContext } from '../../context/products.context';


const Shop = () => {

  const { products } = useContext(ProductContext);

  return (
    <div className="shop-container">  
    {products.map((product) => (
      <div key={product.id}>
        <h1>{product.name}</h1>
      </div>  
      )
    )}
    </div>
  );
};

export default Shop;
