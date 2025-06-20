import HomePage from "./(routes)/home/page";
export const metadata = {
  title: 'Book Your Perfect Stay | Hotels, Flights & Vacation Rentals',
  description: 'Find and book hotels, flights, and vacation rentals worldwide at the best prices. Easy booking, secure payments, and 24/7 customer support.',
  keywords: ['hotel booking', 'flight booking', 'vacation rentals', 'travel deals', 'cheap hotels', 'book flights', 'holiday packages', 'online booking', 'last minute travel', 'travel site'],
};

export default function Home() {
  return (
    <>
    <HomePage />
    </>
  );
}
