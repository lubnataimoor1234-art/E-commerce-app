

// import { useEffect, useState } from 'react';

// export default function useProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://my-json-server.typicode.com/benirvingplt/products/products')
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error('Error fetching products:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   return { products, loading };
// }



import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/benirvingplt/products/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}





