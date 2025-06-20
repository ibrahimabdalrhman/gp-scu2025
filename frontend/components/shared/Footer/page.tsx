"use client";
import { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

// Language-specific data
const content = {
  en: {
    brand: "TravelGuide",
    tagline: "Your Booking Experience",
    followUs: "Follow Us",
    topLinksTitle: "Top Links",
    topLinks: [
      { title: "hotel", slug: "/hotels" },
      { title: "apartment", slug: "/apartments" },
      { title: "resort", slug: "/resorts" },
      { title: "villa", slug: "/villas" },
    ],
    topServicesTitle: "Top Services",
    services: [
      { title: "Hotel Booking", slug: "stays" },
      { title: "Flight Booking", slug: "flights" },
      { title: "Car Rental", slug: "#" },
      { title: "Tour Packages", slug: "#" },
      { title: "Special Offers", slug: "#" },
    ],
    contactUsTitle: "Contact Us",
    phone: "+123456789",
    email: "contact@booking.com",
    address: "123 Booking St, City, Country",
    googleMaps: { link: "https://maps.google.com" },
    langToggle: "العربية",
  },
  ar: {
    brand: "دليل السفر",
    tagline: "تجربة الحجز الخاصة بك",
    followUs: "تابعنا",
    topLinksTitle: "أفضل الروابط",
    topLinks: [
      { title: "أفضل العروض", slug: "/best-offers" },
      { title: "فنادق", slug: "/hotels" },
      { title: "شقق", slug: "/apartments" },
      { title: "منتجعات", slug: "/resorts" },
      { title: "فلل", slug: "/villas" },
    ],
    topServicesTitle: "أفضل الخدمات",
    services: [
      { title: "حجز فندق", slug: "hotel-booking" },
      { title: "حجز طيران", slug: "flight-booking" },
      { title: "تأجير سيارات", slug: "car-rental" },
      { title: "باقات سياحية", slug: "tour-packages" },
      { title: "عروض خاصة", slug: "special-offers" },
    ],
    contactUsTitle: "تواصل معنا",
    phone: "+123456789",
    email: "contact@booking.com",
    address: "123 شارع الحجز، المدينة، الدولة",
    googleMaps: { link: "https://maps.google.com" },
    langToggle: "English",
  },
};

const Footer = () => {
  // State for language (default to English)
  const [lang, setLang] = useState('en');
  const isRTL = lang === 'ar';
  const data = content[lang];

  // Toggle language
  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  return (
    <footer className="flex flex-col bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="py-8 border-t border-b border-gray-200 relative overflow-hidden">
        <div className="container z-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 justify-between items-start self-center my-16">
            {/* Brand Section */}
            <div className="max-w-full sm:col-span-6 lg:col-span-3 pr-4">
              <div>
                <h4 className="heading-three">{data.brand}</h4>
              </div>
              <p className="font-medium my-6">{data.tagline}</p>
              <h5 className="heading-h5 mb-4">{data.followUs}</h5>
              <div className="flex gap-4">
                <Link href="https://facebook.com" className="text-primary" target="_blank">
                  <Facebook className="text-xl" aria-hidden="true" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://instagram.com" className="text-primary" target="_blank">
                  <Instagram className="text-xl" aria-hidden="true" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="https://twitter.com" className="text-primary" target="_blank">
                  <Twitter className="text-xl" aria-hidden="true" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="https://youtube.com" className="text-primary" target="_blank">
                  <Youtube className="text-xl" aria-hidden="true" />
                  <span className="sr-only">Youtube</span>
                </Link>
              </div>
              {/* Language Toggle */}
              {/* <button
                onClick={toggleLanguage}
                className="mt-4 text-primary hover:underline focus:outline-none"
              >
                {data.langToggle}
              </button> */}
            </div>

            {/* Top Links Section */}
            <div className="sm:col-span-6 lg:col-span-2">
              <h3 className="text-primary text-[22px] font-semibold">{data.topLinksTitle}</h3>
              <div className="shrink-0 mt-4 h-1 bg-secondary rounded w-10 mb-5" />
              <ul>
                {data.topLinks.map((item, index) => (
                  <li key={index} className="mb-3">
             
                    <Link href={{ pathname: "/stays", query: { stayType: item?.title } }}className="hover:text-primary">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Services Section */}
            <div className="sm:col-span-6 lg:col-span-3">
              <h3 className="text-primary text-[22px] font-semibold">{data.topServicesTitle}</h3>
              <div className="shrink-0 mt-4 h-1 bg-secondary rounded w-10 mb-5" />
              <ul>
                {data.services.slice(0, 4).map((service , index) => (
                  <li key={index} className="mb-3">
                    <Link href={`${service.slug}`} className="hover:text-primary">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Section */}
            <div className="sm:col-span-6 lg:col-span-3">
              <h3 className="text-primary text-[22px] font-semibold">{data.contactUsTitle}</h3>
              <div className="shrink-0 mt-4 h-1 bg-secondary rounded w-10 mb-5" />
              <ul>
                {data.phone && (
                  <li className="flex gap-3 mb-5">
                    <div>
                      <Phone className="text-2xl" />
                    </div>
                    <div className="break-all">
                      <Link href={`tel:${data.phone}`} className="break-all hover:text-primary">
                        {data.phone}
                      </Link>
                    </div>
                  </li>
                )}
                {data.email && (
                  <li className="flex gap-3 mb-5">
                    <div>
                      <Mail className="text-2xl" />
                    </div>
                    <div className="break-all">
                      <Link href={`mailto:${data.email}`} className="hover:text-primary md:whitespace-nowrap">
                        {data.email}
                      </Link>
                    </div>
                  </li>
                )}
                {data.address && (
                  <li className="flex gap-3">
                    <div>
                      <MapPin className="text-2xl" />
                    </div>
                    <div className="break-all">
                      <Link href={`${data.googleMaps.link}`} className="hover:text-primary md:whitespace-nowrap">
                        {data.address}
                      </Link>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;