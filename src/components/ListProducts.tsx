import { useQuery, gql } from '@apollo/client';
import { Product } from '../types';
import { Divider } from 'antd';
import { ProductCard } from './ProductCard';
import { NoProduct } from './NoProduct';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock
    }
  }
`;

export function ListProducts() {
    const { loading, error, data } = useQuery(GET_PRODUCTS, { fetchPolicy: 'cache-and-network' });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <Divider orientation="center">Products</Divider>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {data.products.map((product: Product) => (
                    <ProductCard {...product} key={product.id} />
                ))}
                {
                    data.products.length === 0 && <NoProduct />
                }
            </div>
        </div>
    );
}
