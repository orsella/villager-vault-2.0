import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Villager Vault",
  description:
    "Checkout possible Animal Crossing villagers or add your new visitor!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background-img">
          <Header />
          <div className="main-container">{children}</div>
        </div>
      </body>
    </html>
  );
}
