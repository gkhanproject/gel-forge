import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "GEL-FORGE // Modular Gel Blaster & Airsoft customizer E-Commerce Hub",
  description: "Build, customize, and procure modular gel blaster and airsoft parts in a high-fidelity tactical customizer with direct search e-commerce platform links.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <meta name="theme-color" content="#0a0b10" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
