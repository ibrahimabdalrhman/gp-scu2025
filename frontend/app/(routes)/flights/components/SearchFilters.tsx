"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CheckBoxInput from "@/components/ui/CheckBoxInput";
import { useFetchData } from "@/hooks/useFetchData";
import InputField from "@/components/ui/InputField";
import { airports } from "@/data";

const stops = [
  { label: "Non-stop", value: "0" },
  { label: "1 Stop", value: "1" },
  { label: "2+ Stops", value: "2" },
];
const minDurationOptions = ["1h", "3h", "5h", "7h", "9h"];

const SearchFilters = ({ filters, setFilters }) => {
  const { data, isPending, isError } = useFetchData("/airlines", "airlines");

  const [minPrice, setMinPrice] = useState(filters?.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters?.maxPrice || "");

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    airlines: true,
    stops: true,
    duration: true,
    facilities: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMinPriceChange = (e) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    setFilters({ ...filters, minPrice: value });
  };

  const handleMaxPriceChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    setFilters({ ...filters, maxPrice: value });
  };

  const handleStopsChange = (value) => {
    const newValue = filters.stops === value ? "" : value;
    setFilters({ ...filters, stops: newValue });
  };

  const handleSingleSelect = (key, value) => {
    setFilters({ ...filters, [key]: filters[key] === value ? "" : value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-1">
      {/* Price Filter */}
      <div className="py-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-semibold">Price Range</h3>
          <div className="md:hidden">
            {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
        <div className={`${expandedSections.price ? "block" : "hidden"} md:block`}>
          <div className="flex space-x-3">
            <InputField
              type="number"
              label="Min"
              name="minPrice"
              className="w-1/2"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <InputField
              type="number"
              label="Max"
              name="maxPrice"
              className="w-1/2"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="border-t border-gray-200 my-2" />
      <div className="py-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("airlines")}
        >
          <h3 className="font-semibold">Airlines</h3>
          <div className="md:hidden">
            {expandedSections.airlines ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
        <div className={`${expandedSections.airlines ? "block" : "hidden"} md:block`}>
          <div className="space-y-3">
            {isPending && <p className="text-sm text-gray-500">Loading airlines...</p>}
            {isError && <p className="text-sm text-red-500">Failed to load airlines</p>}
            {airports?.map((airline, i) => (
              <div key={airline.id || i} className="flex items-center space-x-2">
                <CheckBoxInput
                  id={airline.id}
                  label={airline.name}
                  name="from"
                  checked={filters.from === airline.name}
                  onChange={() => handleSingleSelect("from", airline.name)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stops Filter */}
      <div className="border-t border-gray-200 my-2" />
      <div className="py-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("stops")}
        >
          <h3 className="font-semibold">Stops</h3>
          <div className="md:hidden">
            {expandedSections.stops ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
        <div className={`${expandedSections.stops ? "block" : "hidden"} md:block`}>
          <div className="space-y-3">
            {stops.map((stop, i) => (
              <div key={i} className="flex items-center space-x-2">
                <CheckBoxInput
                  id={stop.label}
                  label={stop.label}
                  name="stops"
                  checked={filters.stops === stop.value}
                  onChange={() => handleStopsChange(stop.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Filter */}
      <div className="border-t border-gray-200 my-2" />
      <div className="py-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("duration")}
        >
          <h3 className="font-semibold">Flight Duration</h3>
          <div className="md:hidden">
            {expandedSections.duration ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
        <div className={`${expandedSections.duration ? "block" : "hidden"} md:block`}>
          <div className="space-y-3">
            {minDurationOptions.map((duration, i) => (
              <div key={i} className="flex items-center space-x-2">
                <CheckBoxInput
                  id={duration}
                  label={duration}
                  name="minDuration"
                  checked={filters.minDuration === duration}
                  onChange={() => handleSingleSelect("minDuration", duration)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
