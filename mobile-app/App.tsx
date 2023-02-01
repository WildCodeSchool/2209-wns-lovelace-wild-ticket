import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";

const GRAPHQL_API_URL = Constants?.expoConfig?.extra?.GRAPHQL_API_URL;
const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Navigation colorScheme={undefined} />
      </ApolloProvider>
    </SafeAreaProvider>
  );
}