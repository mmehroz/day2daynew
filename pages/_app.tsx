import type { AppProps } from "next/app";
import { Layout } from "@components";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.scss";
import apolloClient from "lib/apollo";
import {
  Provider,
  ProductPopupProvider,
  CartProvider,
  UiProvider,
  UserProvider,
} from "@context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <CartProvider>
          <ProductPopupProvider>
            <Provider>
              <UiProvider>
                <Layout>
                  <Component {...pageProps} />;
                  <Analytics />
                </Layout>
              </UiProvider>
            </Provider>
          </ProductPopupProvider>
        </CartProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
