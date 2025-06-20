"use client";

import React, { useState } from "react";
import {
  Plane,
  CalendarDays,
  DoorOpen,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { useSendData } from "@/hooks/useSendData";

const FlightTicketCard = ({
  id,
  airline,
  departureTime,
  departureAirport,
  departureCode,
  arrivalTime,
  arrivalAirport,
  arrivalCode,
  duration,
  flightType,
  date,
  terminal,
  gate,
  amenities,
  available_passenger_number,
  price: price_per_passenger,
}: any) => {
  const [selectedClass, setSelectedClass] = useState(price_per_passenger?.[0]?.class_type || "");
  const [passengerCount, setPassengerCount] = useState(1);

  const selectedPrice = price_per_passenger.find(
    (p: any) => p.class_type === selectedClass
  )?.price;

  const { mutateAsync, isPending } = useSendData("/flight-booking");

  const handleSubmit = async () => {
    const data = {
      flight: id,
      seat_class: selectedClass,
      price: selectedPrice?.toString(),
      passenger_count: passengerCount.toString(),
      special_requests: amenities?.join(", ") || "",
    };

    try {
      const response = await mutateAsync(data);
      if (response.status === 201) {
        window.location.href = response?.data?.url;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="p-6 w-full md:w-3/4 flex flex-col gap-4">
          {/* Airline */}
          <div className="flex items-center gap-2 text-darkText text-sm font-medium">
            <Plane className="size-4 text-secondary" />
            {airline}
          </div>

          {/* Travel Info */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-4">
            <div className="text-center md:text-start">
              <p className="text-xl font-bold">{departureTime}</p>
              <p className="text-sm text-gray-500">
                {departureAirport} ({departureCode})
              </p>
            </div>

            <div className="flex flex-col items-center text-gray-400">
              <span className="text-xs mb-1">{duration}</span>
              <div className="relative w-24 md:w-32 h-px bg-gray-300">
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 size-4" />
              </div>
              <span className="text-xs mt-1">{flightType}</span>
            </div>

            <div className="text-center md:text-start">
              <p className="text-xl font-bold">{arrivalTime}</p>
              <p className="text-sm text-gray-500">
                {arrivalAirport} ({arrivalCode})
              </p>
            </div>
          </div>

          {/* Extra Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
            {flightType?.map((type: string, index: number) => (
              <span
                className="bg-primary px-6 py-2 rounded-full text-white"
                key={index}
              >
                {type}
              </span>
            ))}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-3 mt-4 text-gray-500">
            {amenities?.map((item: string) => (
              <span
                key={item}
                className="px-3 py-1 border border-primary text-primary text-xs rounded-full capitalize"
              >
                {item.replace("_", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white shadow-md p-6 w-full md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-between">
          <div className="text-right">
            {/* Class select */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md mt-3 text-darkText focus:outline-primary"
            >
              {price_per_passenger.map((p: any) => (
                <option key={p._id} value={p.class_type}>
                  {p?.class_type + " - " + p?.price?.toLocaleString()}
                </option>
              ))}
            </select>

            {/* Passenger count select */}
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-1">Passengers</label>
              <select
                value={passengerCount}
                onChange={(e) => setPassengerCount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-darkText focus:outline-primary"
              >
                {Array.from({ length: available_passenger_number }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 mt-6 text-sm text-gray-700">
            <div className="flex justify-between items-center">
              <CalendarDays className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex justify-between items-center">
              <Landmark className="w-4 h-4" />
              <span>{terminal}</span>
            </div>
            <div className="flex justify-between items-center">
              <DoorOpen className="w-4 h-4" />
              <span>{gate}</span>
            </div>
          </div>

          <button onClick={handleSubmit} className="mt-2 block btn-v-1 text-center">
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightTicketCard;
