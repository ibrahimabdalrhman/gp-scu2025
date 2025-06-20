import { Search, Calendar, Star, MapPin, Award, Shield, BedSingle, Store, Landmark, BedDouble, MountainSnow, Tent, BookTemplate, Tractor } from 'lucide-react';
import { Hotel, Building2, TreePalm, Home } from 'lucide-react';
import { ICityType, IRoomProps, IStayTypeItem, ITestimonialCardProps, ITourType } from '@/types';
export const stayTypes: IStayTypeItem[] = [
  {
    name: "Hotel",
    title: "hotel",
    icon: Hotel,
    count: 19,
    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Apartment",
    title: "apartment",
    icon: Building2,
    count: 22,
    image: 'https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Villa",
    title: "villa",
    icon: Home,
    count: 14,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' // فيلا خاصة
  },
  {
    name: "Resort",
    title: "resort",
    icon: TreePalm,
    count: 26,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Hostel",
    title: "hostel",
    icon: BedSingle,
    count: 10,
    image: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Guest House",
    title: "guest_house",
    icon: Store,
    count: 9,
    image: 'https://plus.unsplash.com/premium_photo-1686167988053-3c9501537a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Holiday Home",
    title: "holiday_home",
    icon: Landmark,
    count: 7,
    image: 'https://plus.unsplash.com/premium_photo-1689609949905-0d27dac6c38e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Bed and Breakfast",
    title: "bed_and_breakfast",
    icon: BedDouble,
    count: 12,
    image: 'https://images.unsplash.com/photo-1587094666821-7a1ecab87e70?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Cabin",
    title: "cabin",
    icon: MountainSnow,
    count: 6,
    image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Glamping",
    title: "glamping",
    icon: Tent,
    count: 4,
    image: 'https://images.unsplash.com/photo-1624254495476-db6cc8b77e98?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Boat",
    title: "boat",
    icon: BookTemplate,
    count: 3,
    image: 'https://plus.unsplash.com/premium_photo-1675802755792-a7cfd346b5be?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Farm Stay",
    title: "farm_stay",
    icon: Tractor,
    count: 5,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' 
  },
  {
    name: "Boutique Hotel",
    title: "boutique_hotel",
    icon: Hotel,
    count: 8,
    image: 'https://images.unsplash.com/photo-1532313944948-f7c5433f64e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    name: "Ryokan",
    title: "ryokan",
    icon: Landmark,
    count: 2,
    image: 'https://images.unsplash.com/photo-1614301246509-d1fc7d78b6b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
];

export const destinationsData : ITravelCardProps[] = [
    { 
      id: "1", 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 
      title: 'Adventure in the Alps', 
      location: 'Interlaken, Switzerland', 
      price: 799, 
      days: 7, 
      rating: 4.8, 
      reviews: 245,
      popular: true
    },
    { 
      id: "2", 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 
      title: 'Balinese Getaway', 
      location: 'Bali, Indonesia', 
      price: 899, 
      days: 10, 
      rating: 4.7, 
      reviews: 189,
      popular: false
    },
    { 
      id: "3", 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 
      title: 'Mediterranean Cruise', 
      location: 'Greek Islands', 
      price: 1299, 
      days: 12, 
      rating: 4.9, 
      reviews: 312,
      popular: true
    },
    { 
      id: "4", 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 
      title: 'Adventure in the Alps', 
      location: 'Interlaken, Switzerland', 
      price: 799, 
      days: 7, 
      rating: 4.8, 
      reviews: 245,
      popular: true
    },
    { 
      id: '5', 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 
      title: 'Balinese Getaway', 
      location: 'Bali, Indonesia', 
      price: 899, 
      days: 10, 
      rating: 4.7, 
      reviews: 189,
      popular: false
    },
    { 
      id: "6", 
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', 
      title: 'Mediterranean Cruise', 
      location: 'Greek Islands', 
      price: 1299, 
      days: 12, 
      rating: 4.9, 
      reviews: 312,
      popular: true
    },
  ];
  
  export const cities:ICityType[] = [
    {
      name: 'Cairo',
      hotelCount: 27,
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be'
    },
    {
      name: 'Alexandria',
      hotelCount: 16,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625'
    },
    {
      name: 'Hurghada',
      hotelCount: 23,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3'
    },
    {
      name: 'Sharm El Sheikh',
      hotelCount: 21,
      image: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151'
    }
  ];
  export const toursData : ITourType[] = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
      hotels: 457
    },
    {
      id: 2,
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      hotels: 382
    },
    {
      id: 3,
      name: 'Swiss Alps',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      hotels: 245
    }
  ];
  export const testimonialsData : ITestimonialCardProps[] = [
    {
      id: "1",
      content: "Our trip to Bali was amazing! The accommodations were perfect and the activities were well organized. Will definitely book with them again!",
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 5,
      location: "New York, USA"
    },
    {
      id: "2",
      content: "The support team was incredibly helpful before and during our trip. When we had a last-minute change, they handled it perfectly.",
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 5,
      location: "Toronto, Canada"
    },
    {
      id: "3",
      content: "We were hesitant to book online but this exceeded our expectations. The itinerary was perfectly balanced with activities and free time.",
      author: "Emma Roberts",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 4,
      location: "London, UK"
    },
    {
      id: "4",
      content: "This was our third time using Travel G:ide and they never disappoint. The destinations they recommend are always amazing!",
      author: "David Lopez",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 5,
      location: "Sydney, Australia"
    },
    {
      id: "5",
      content: "Our trip to Bali was amazing! The accommodations were perfect and the activities were well organized. Will definitely book with them again!",
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 5,
      location: "New York, USA"
    },
    {
      id: "6",
      content: "The support team was incredibly helpful before and during our trip. When we had a last-minute change, they handled it perfectly.",
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 5,
      location: "Toronto, Canada"
    },
    {
      id: "7",
      content: "We were hesitant to book online but this exceeded our expectations. The itinerary was perfectly balanced with activities and free time.",
      author: "Emma Roberts",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 4,
      location: "London, UK"
    },
    {
      id: "8",
      content: "This was our third time using Travel G:ide and they never disappoint. The destinations they recommend are always amazing!",
      author: "David Lopez",
      avatar: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50",
      rating: 5,
      location: "Sydney, Australia"
    },
  ];

export const breadcrumbItems = [

    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Dashboard', path: '/dashboard' },
  ];


export const featuresData= [
  {
    icon: Search,
    title: 'Best Price Guarantee',
    description: "Find a lower price? We'll match it plus give you an additional 10% off."
  },
  {
    icon: Calendar,
    title: 'Free Cancellation',
    description: 'Plans change? No problem. Cancel up to 24 hours before check-in.'
  },
  {
    icon: Star,
    title: 'Verified Reviews',
    description: 'Real reviews from real guests who have stayed at our properties.'
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Stay in the heart of your destination with our carefully selected properties.'
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: '24/7 customer support to ensure your stay is perfect from start to finish.'
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Your payment and personal information are protected with advanced encryption.'
  }
];

export const roomData: IRoomProps[] = [
  {
    id: "111",
    name: "Room, 1 King Bed, Accessible, Bathtub",
    price: 120,
    accessible: true,
    hasBathroom: true,
    size: "26m²",
    maxGuests: 2,
    bedSize: "King bed",
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    amenities: {
      freeWifi: true,
      nonRefundable: true,
      breakfastIncluded: true,
      creditCardRequired: true
    }
  },
  {
    id: "222",
    name: "Room, 1 King bed, Accessible, Bathtub",
    price: 130,
    accessible: true,
    hasBathroom: true,
    size: "28m²",
    maxGuests: 2,
    bedSize: "King bed",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    amenities: {
      freeWifi: true,
      nonRefundable: false,
      breakfastIncluded: true,
      creditCardRequired: true
    }
  },
  {
    id: "333",
    name: "Room, 1 King bed, Accessible, Bathtub",
    price: 145,
    accessible: true,
    hasBathroom: true,
    size: "30m²",
    maxGuests: 2,
    bedSize: "King bed",
    imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    amenities: {
      freeWifi: true,
      nonRefundable: false,
      breakfastIncluded: true,
      creditCardRequired: true
    }
  },
];


export const faqData = [
  {
    question: "What amenities are included with the hotel stay?",
    answer: "The hotel includes free Wi-Fi, access to the pool area, complimentary breakfast (depending on the room type selected), fitness center access, and daily housekeeping. Additional amenities may vary by room type."
  },
  {
    question: "What is the hotel's check-in and check-out time?",
    answer: "Standard check-in time is 2:00 PM (14:00) and check-out time is 12:00 PM (noon). Early check-in or late check-out may be available upon request, subject to availability and possibly additional fees."
  },
  {
    question: "Is free cancellation available?",
    answer: "Cancellation policies vary by room type. Most of our rooms offer free cancellation up to 24 hours before check-in. Non-refundable rates are also available at a discount. Please check the specific cancellation policy for your selected room before booking."
  }
];


export const airports = [
  { id: 1, name: 'New York' },
  { id: 2, name: 'Los Angeles' },
  { id: 3, name: 'Chicago' },
  { id: 4, name: 'Atlanta' },
  { id: 5, name: 'Dallas' },
  { id: 6, name: 'Denver' },
  { id: 7, name: 'San Francisco' },
  { id: 8, name: 'Seattle' },
  { id: 9, name: 'Miami' },
  { id: 10, name: 'Boston' },
  { id: 11, name: 'London' },
  { id: 12, name: 'Paris' },
  { id: 13, name: 'Tokyo' },
  { id: 14, name: 'Dubai' },
  { id: 15, name: 'Singapore' },
  { id: 16, name: 'Hong Kong' },
  { id: 17, name: 'Sydney' },
  { id: 18, name: 'Toronto' },
  { id: 19, name: 'Mexico City' },
  { id: 20, name: 'Rome' },
  { id: 21, name: 'Berlin' },
  { id: 22, name: 'Moscow' },
  { id: 23, name: 'Delhi' },
  { id: 24, name: 'Bangkok' },
  { id: 25, name: 'Istanbul' },
  { id: 26, name: 'Barcelona' },
  { id: 27, name: 'Amsterdam' },
  { id: 28, name: 'Johannesburg' },
  { id: 29, name: 'Buenos Aires' },
  { id: 30, name: 'Cairo' },
  { id: 31, name: 'Lagos' },
  { id: 32, name: 'Jakarta' },
  { id: 33, name: 'Kuala Lumpur' },
  { id: 34, name: 'Sao Paulo' },
  { id: 35, name: 'Zurich' },
  { id: 36, name: 'Vienna' },
  { id: 37, name: 'Lisbon' },
  { id: 38, name: 'Prague' },
  { id: 39, name: 'Budapest' },
  { id: 40, name: 'Copenhagen' },
]
