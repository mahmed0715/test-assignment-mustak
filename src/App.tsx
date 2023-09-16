import './App.css';
import { setContext } from '@apollo/client/link/context';

import { Layout, Typography } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { Products } from './Products';
import { CreateProduct } from './CreateProduct';


const { Header, Content } = Layout;
const { Title } = Typography;

const httpLink = createHttpLink({
  uri: 'https://fast-weasel-48.hasura.app/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": "mYxQV3ltUAKfqcBYpVLSaeNbzSKlinpaNIs0LfLIdmp136WAXYKAkYTUwf0zYn4e",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
