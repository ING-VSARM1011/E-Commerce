import { useState, useEffect } from 'react';
import Layout from '../../Components/Layout'
import Card from '../../Components/Card';

function Home() {

  const [products, setProducts] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <Layout>
      Home
      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {products?.map((product) => (
          <>
            <Card key={product.id} data={product} />
          </>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
