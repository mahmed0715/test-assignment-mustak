import './App.css';
import { setContext } from '@apollo/client/link/context';

import { Layout, Typography } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { Products } from './components/Products';
import { CreateProduct } from './components/CreateProduct';


const { Header, Content } = Layout;
const { Title } = Typography;

const httpLinkLocal = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
})

const authLinkLocal = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": "myadminsecretkey",
    }
  }
});

const client = new ApolloClient({
  link: authLinkLocal.concat(httpLinkLocal),
  cache: new InMemoryCache()
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Layout style={{ height: '100vh' }}>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Title style={{ color: 'white', margin: 0, textAlign: 'left' }}>Inventory App</Title>
          </Header>
          <Content style={{ padding: '1em' }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" Component={Products} />
                <Route path="/add-product" Component={CreateProduct} />
              </Routes>
            </BrowserRouter>
          </Content>
        </Layout>
      </div>
    </ApolloProvider>
  );

}

export default App;
