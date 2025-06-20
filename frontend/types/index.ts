import { LucideIcon } from "lucide-react";
import React, { InputHTMLAttributes } from "react";
export interface IStayTypeItem {
  name: string,
  title: string;
  icon: LucideIcon;
  count: number;
  image: string;
}
export interface ICityType {
  name: string;
  hotelCount: number;
  image: string;
}
export interface ITourType {
  id: number;
  name: string;
  image: string;
  hotels: number;
}
export interface IStayType {
  _id?: string;
  id : string | number;
  key?: string;
  name?: string;
  description?: string;
  price?: number;
  priceAfterDiscount?: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  city?: string;
  country?: string;
  images?: string[];
  coverImage?: string;
  availableRooms?: number;
  stayType?: string[];
  type?: string;
  availableStatus?: boolean;
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: number | string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export interface ITestimonialCardProps {
  id: string;
  content: string;
  author: string;
  avatar: string;
  rating: number;
  location: string;
}

export interface IBreadcrumbProps {
  label: string;
  path: string;
}

export interface IRoomProps {
  id: string;
  name: string;
  price: number;
  accessible: boolean;
  hasBathroom: boolean;
  size: string;
  maxGuests: number;
  bedSize: string;
  imageUrl: string;
  amenities: {
    freeWifi: boolean;
    nonRefundable: boolean;
    breakfastIncluded: boolean;
    creditCardRequired: boolean;
  };
}

export interface IFaqItemProps {
  question: string;
  answer: string;
  index: number;
}
