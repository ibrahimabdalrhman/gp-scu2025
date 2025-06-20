import "./globals.css";
import Footer from "@/components/shared/Footer/page";
import { QueryProvider } from "@/libs/providers/QueryProvider";
import NavBar from "@/components/shared/NavBar/NavBar";
import {  BookingContextProvider } from "@/libs/providers/BookingContextProvider";

export const metadata = {
  title: "Book Your Perfect Stay | Hotels, Flights & Vacation Rentals",
  description:
    "Find and book hotels, flights, and vacation rentals worldwide at the best prices. Easy booking, secure payments, and 24/7 customer support.",
  keywords: [
    "hotel booking",
    "flight booking",
    "vacation rentals",
    "travel deals",
    "cheap hotels",
    "book flights",
    "holiday packages",
    "online booking",
    "last minute travel",
    "travel site",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryProvider>
          <BookingContextProvider>
            <main className="flex flex-col justify-between min-h-screen">
              <NavBar />
              {children}
              <Footer />
            </main>
          </BookingContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
