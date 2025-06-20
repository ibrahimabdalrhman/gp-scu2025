"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export type RoomType = "single" | "double" | "suite";

export interface BookingContextType {
  city: string;
  setCity: (city: string) => void;
  checkIn: string;
  setCheckIn: (date: string) => void;
  checkOut: string;
  setCheckOut: (date: string) => void;
  roomType: RoomType;
  setRoomType: (type: RoomType) => void;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCityState] = useState("");
  const [checkIn, setCheckInState] = useState("");
  const [checkOut, setCheckOutState] = useState("");
  const [roomType, setRoomTypeState] = useState<RoomType>("single");

  // Load from localStorage on mount
  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    const storedCheckIn = localStorage.getItem("checkIn");
    const storedCheckOut = localStorage.getItem("checkOut");
    const storedRoomType = localStorage.getItem("roomType") as RoomType;

    if (storedCity) setCityState(storedCity);
    if (storedCheckIn) setCheckInState(storedCheckIn);
    if (storedCheckOut) setCheckOutState(storedCheckOut);
    if (storedRoomType) setRoomTypeState(storedRoomType);
  }, []);

  // Save to localStorage on change
  const setCity = (value: string) => {
    setCityState(value);
    localStorage.setItem("city", value);
  };

  const setCheckIn = (value: string) => {
    setCheckInState(value);
    localStorage.setItem("checkIn", value);
  };

  const setCheckOut = (value: string) => {
    setCheckOutState(value);
    localStorage.setItem("checkOut", value);
  };

  const setRoomType = (value: RoomType) => {
    setRoomTypeState(value);
    localStorage.setItem("roomType", value);
  };

  return (
    <BookingContext.Provider
      value={{ city, setCity, checkIn, setCheckIn, checkOut, setCheckOut, roomType, setRoomType }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingContextProvider");
  }
  return context;
};
