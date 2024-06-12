import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Layout/Header";
import Layout from "./Components/Layout/Layout";
import { Provider } from 'react-redux';
import store from "./redux/store";
import StoreProvider from "./Components/StoreProvider/StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WDMS",
  description: "Wallet Denomination Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>

      
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header/>
        {/* <Provider store={store}> */}
          {children}            
          {/* </Provider> */}
        </body>
        </StoreProvider>
    </html>
  );
}
