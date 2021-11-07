import { ApolloProvider }from '@apollo/client';
import { InventarioApp } from './routes/InventarioApp';
import { client } from './graphql/client';

const App = () => {
  return (
    <ApolloProvider client={ client } >
      <InventarioApp />
    </ApolloProvider>
  );
}

export default App;
