import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Components/Layout/Header";
import Layout from "./Components/Layout/Layout";
import { Provider } from 'react-redux';
import store from "./redux/store";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WDMS",
  description: "Wallet Denomination Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {/* <Provider store={store}> */}
          {children}            
          {/* </Provider> */}
        </body>
    </html>
  );
}
