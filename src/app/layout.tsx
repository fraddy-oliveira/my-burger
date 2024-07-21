import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@app/components/Layout/Layout";
import { AuthStoreProvider } from "@app/providers/auth-store-provider";
import { OrdersStoreProvider } from "@app/providers/orders-store-provider";
import { BurgerBuilderStoreProvider } from "@app/providers/burger-builder-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burger App",
  description: "Build your own burger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthStoreProvider>
          <BurgerBuilderStoreProvider>
            <OrdersStoreProvider>
              <Layout>{children}</Layout>
            </OrdersStoreProvider>
          </BurgerBuilderStoreProvider>
        </AuthStoreProvider>
      </body>
    </html>
  );
}
