import { gql, useQuery } from '@apollo/client';
import Statistic from 'antd/es/statistic/Statistic';
import { ListProducts } from './ListProducts';
import { Link } from 'react-router-dom';
import { Button, Card, Space } from 'antd';

const countQuery = gql`
  query CountQuery {
    products_aggregate {
      aggregate {
        sum {
          stock
        }
        count
      }
    }
  }
`

export function Products(): JSX.Element {

  const { data } = useQuery(countQuery, { fetchPolicy: 'cache-and-network' });

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Space direction="horizontal">
          <Space>
            <Card style={{ width: 300 }}>
              <Statistic title="Total products" value={data?.products_aggregate?.aggregate.count} />
            </Card>
          </Space>
          <Space>
            <Card style={{ width: 300 }}>
              <Statistic title="Total Stock" value={data?.products_aggregate?.aggregate.sum.stock || 0} />
            </Card>
          </Space>
          <Space>
            <Button type="primary"><Link to="/add-product">Add Product</Link></Button>
          </Space>
        </Space>
      </div>
      <ListProducts />
    </div>
  );
}