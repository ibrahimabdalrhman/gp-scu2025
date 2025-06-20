"use client";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/selectComponents/SelectFieldA";
import { airports } from "@/data";
import { useFetchData } from "@/hooks/useFetchData";
import { FlightSearchSchema } from "@/rules/FlightSearchSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";

export default function FlightSearchBox({filters , setFilters}: any) {
  const [tripType, setTripType] = useState("round");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FlightSearchSchema),
  });

const onSubmit = (data: any) => {
setFilters((prev : any) => ({
  ...prev,
  from: data.from,
  to: data.to,
  class_type : data.class_type,
  arrivalDate : data.arrivalDate
}));
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[90%] max-w-4xl bg-white border border-gray-200 px-6 py-8 rounded-2xl z-10"
    >
      {/* Trip Type Selector */}
      <div className="flex items-center rounded-lg overflow-hidden">
        <button
          type="button"
          className={`trip-button ${
            tripType === "round" ? "trip-button-active" : ""
          }`}
          onClick={() => setTripType("round")}
        >
          Round Trip
        </button>
        <button
          type="button"
          className={`trip-button ${
            tripType === "oneway" ? "trip-button-active" : ""
          }`}
          onClick={() => setTripType("oneway")}
        >
          One Way
        </button>
      </div>

      {/* Hidden input for tripType */}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        <div>
          <SelectField
            label="From"
            id="from"
            options={airports}
            {...register("from")}
          />
          {errors.from && <p className="error">{errors.from.message}</p>}
        </div>
        <div>
          <SelectField
            label="To"
            id="to"
            options={airports}
            {...register("to")}
          />
          {errors.to && <p className="error">{errors.to.message}</p>}
        </div>
        <div>
          <InputField
            label="Departure Date"
            type="date"
            id="departure"
            {...register("departure")}
          />
          {errors.departure && (
            <p className="error">{errors.departure.message}</p>
          )}
        </div>

        {tripType === "round" && (
          <div>
            <InputField
              label="Return Date"
              type="date"
              id="return"
              {...register("return")}
            />
            {errors.return && <p className="error">{errors.return.message}</p>}
          </div>
        )}
        <div>
          <SelectField
            label="Ticket Type"
            id="ticketType"
            options={[{ name: "economy_class" }, { name: "business_class" }]}
            {...register("class_type")}
          />
       {errors.class_type && (
  <p className="error">{errors.class_type.message}</p>
)}

        </div>
        <div>
          <InputField
            label="Number of Travellers"
            type="number"
            id="travellers"
            min={1}
            defaultValue={1}
            {...register("travellers")}
          />
          {errors.travellers && (
            <p className="error">{errors.travellers.message}</p>
          )}
        </div>

        <div className="flex flex-col justify-end">
          <button type="submit" className="search-button">
            <Search className="mr-2" color="white" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
