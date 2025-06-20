"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import InputField from "@/components/ui/InputField";
import CheckBoxInput from "@/components/ui/CheckBoxInput";

interface FilterSectionProps {
  id: "price" | "propertyType" | "starRating" | "facilities";
  title: string;
  children: React.ReactNode;
}
// const propertyTypes = [
//   { label: "hotel", value: "HOTEL" },
//   { label: "apartment", value: "APARTMENT" },
//   { label: "villa", value: "VILLA" },
//   { label: "resort", value: "RESORT" },
//   { label: "hostel", value: "HOSTEL" },
//   { label: "guest_house", value: "GUEST_HOUSE" },
//   { label: "holiday_home", value: "HOLIDAY_HOME" },
//   { label: "bed_and_breakfast", value: "BED_AND_BREAKFAST" },
//   { label: "cabin", value: "CABIN" },
//   { label: "glamping", value: "GLAMPING" },
//   { label: "boat", value: "BOAT" },
//   { label: "farm_stay", value: "FARM_STAY" },
//   { label: "boutique_hotel", value: "BOUTIQUE_HOTEL" },
//   { label: "ryokan", value: "RYOKAN" }
// ];
const propertyTypes = [
  { label: "hotel", value: "hotel" },
  { label: "apartment", value: "apartment" },
  { label: "villa", value: "villa" },
  { label: "resort", value: "resort" },
  { label: "hostel", value: "hostel" },
  { label: "guest_house", value: "guest_house" },
  { label: "holiday_home", value: "holiday_home" },
  { label: "bed_and_breakfast", value: "bed_and_breakfast" },
  { label: "cabin", value: "cabin" },
  { label: "glamping", value: "glamping" },
  { label: "boat", value: "boat" },
  { label: "farm_stay", value: "farm_stay" },
  { label: "boutique_hotel", value: "boutique_hotel" },
  { label: "ryokan", value: "ryokan" },
];

const facilityOptions = [
  { label: "wifi", value: "WIFI", name: "Wi-Fi" },
  { label: "parking", value: "PARKING", name: "Parking" },
  { label: "pool", value: "POOL", name: "Swimming Pool" },
  { label: "gym", value: "GYM", name: "Gym / Fitness Center" },
  {
    label: "air_conditioning",
    value: "AIR_CONDITIONING",
    name: "Air Conditioning",
  },
  { label: "pet_friendly", value: "PET_FRIENDLY", name: "Pet Friendly" },
  { label: "restaurant", value: "RESTAURANT", name: "Restaurant" },
  { label: "spa", value: "SPA", name: "Spa" },
  { label: "bar", value: "BAR", name: "Bar" },
  { label: "beach_access", value: "BEACH_ACCESS", name: "Beach Access" },
  {
    label: "laundry_service",
    value: "LAUNDRY_SERVICE",
    name: "Laundry Service",
  },
  { label: "room_service", value: "ROOM_SERVICE", name: "Room Service" },
  { label: "free_breakfast", value: "FREE_BREAKFAST", name: "Free Breakfast" },
  {
    label: "business_center",
    value: "BUSINESS_CENTER",
    name: "Business Center",
  },
  {
    label: "family_friendly",
    value: "FAMILY_FRIENDLY",
    name: "Family Friendly",
  },
  { label: "smoke_free", value: "SMOKE_FREE", name: "Smoke-Free" },
  {
    label: "airport_shuttle",
    value: "AIRPORT_SHUTTLE",
    name: "Airport Shuttle",
  },
  { label: "parking_garage", value: "PARKING_GARAGE", name: "Parking Garage" },
  { label: "hot_tub", value: "HOT_TUB", name: "Hot Tub / Jacuzzi" },
  { label: "elevator", value: "ELEVATOR", name: "Elevator" },
  { label: "free_wifi", value: "FREE_WIFI", name: "Free Wi-Fi" },
  { label: "24h_reception", value: "24H_RECEPTION", name: "24-Hour Reception" },
];

const starRatings = ["5", "4", "3", "2", "1"];

export const SearchFilters: React.FC<any> = ({
  stayType,
  setStayType,
  featured,
  setFeatured,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  rating = [],
  setRating,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    propertyType: true,
    starRating: true,
    facilities: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleToggle = (
    value: string,
    state: string[],
    setState: (val: string[]) => void
  ) => {
    setState(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
  };

  const FilterSection: React.FC<FilterSectionProps> = ({
    id,
    title,
    children,
  }) => (
    <div className="py-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => toggleSection(id)}
      >
        <h3 className="font-semibold">{title}</h3>
        <div className="md:hidden">
          {expandedSections[id] ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
      </div>
      <div className={`${expandedSections[id] ? "block" : "hidden"} md:block`}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-1">
        {/* Price Filter */}
        <FilterSection id="price" title="Price">
          <div className="flex space-x-3">
            <InputField
              type="number"
              label="Min"
              name="minPrice"
              className="w-1/2"
              min={0}
              value={minPrice}
              onChange={(e) => {
                // فلترة القيمة عشان تتأكد إنها رقم موجب أو فارغة
                const val = e.target.value;
                if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0)) {
                  setMinPrice(val);
                }
              }}
            />

            <InputField
              type="number"
              label="Max"
              name="maxPrice"
              className="w-1/2"
              min={0}
              value={maxPrice}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (/^\d+$/.test(val) && Number(val) >= 0)) {
                  setMaxPrice(val);
                }
              }}
            />
          </div>
        </FilterSection>

        {/* Property Type Filter */}
        <div className="border-t border-gray-200 my-2" />
        <FilterSection id="propertyType" title="Property Type">
          <div className="space-y-3">
            {propertyTypes.map((type, i) => (
              <div key={i} className="flex items-center space-x-2">
                <CheckBoxInput
                  id={type.label}
                  label={type.label}
                  name="propertyType"
                  value={type.value}
                  checked={stayType.includes(type.value)}
                  onChange={() =>
                    handleToggle(type.value, stayType, setStayType)
                  }
                />
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Star Rating Filter */}
        <div className="border-t border-gray-200 my-2" />
        <FilterSection id="starRating" title="Star Rating">
          <div className="space-y-3">
            {starRatings.map((star, i) => (
              <div key={i} className="flex items-center space-x-2">
                <CheckBoxInput
                  id={star}
                  label={star}
                  name="starRating"
                  checked={rating.includes(star)}
                  onChange={() => handleToggle(star, rating, setRating)}
                />
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Facilities Filter */}
        <div className="border-t border-gray-200 my-2" />
        <FilterSection id="facilities" title="Facilities">
          <div className="space-y-3">
            {facilityOptions.map((facility, i) => (
              <div key={i} className="flex items-center space-x-2">
                <CheckBoxInput
                  id={facility.label}
                  label={facility.name.replace(/_/g, " ")}
                  name="facilities"
                  value={facility.label}
                  checked={featured.includes(facility.label)}
                  onChange={() =>
                    handleToggle(facility.label, featured, setFeatured)
                  }
                />
              </div>
            ))}
          </div>
        </FilterSection>
      </div>
    </>
  );
};

export default SearchFilters;
