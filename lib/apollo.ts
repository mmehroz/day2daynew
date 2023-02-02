import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
	uri:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3000/api/graphql'
			: 'https://day2day-ten.vercel.app/api/graphql',
	cache: new InMemoryCache(),
});

export default apolloClient;
