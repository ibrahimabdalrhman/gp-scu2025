"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListFilter, X } from "lucide-react";
import SearchFilters from "./SearchFilters";
import FlightTicketCard from "./FlightTicketCard";
import Pagination from "@/components/pagination/Pagination";

const FilterResults = ({
  filters,
  setFilters,
  data,
  isPending,
  isError,
}: any) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section>
      <div className="min-h-screen container py-12 px-6">
        {/* Top bar */}
        <div className="flex justify-between mb-6">
          <div className="flex justify-end gap-4">
            <button
              className="lg:hidden"
              onClick={() => setShowFilters(true)}
              aria-label="Show filters"
            >
              <ListFilter size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex gap-8 mt-6">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-1/4">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </aside>

          <div className="space-y-6 lg:w-3/4 w-full">
            {isPending && <p>Loading flights...</p>}
            {isError && (
              <p className="text-red-500">
                Failed to load flights. Please try again.
              </p>
            )}

            {!isPending && !isError && data?.data?.length === 0 && (
              <p>No flights found matching your filters.</p>
            )}

            {!isPending &&
              !isError &&
              data?.data?.map((fl: any) => (
                <FlightTicketCard
                  key={fl?._id}
                  id={fl?._id}
                  available_passenger_number={fl?.available_passenger_number}
                  airline={fl?.airline?.name}
                  price={fl?.price_per_passenger}
                  departureTime={fl?.departure_time}
                  departureAirport={fl?.departure_airport}
                  departureCode="CAI"
                  arrivalTime={fl?.arrival_time}
                  arrivalAirport={fl?.arrival_airport}
                  arrivalCode="LHR"
                  duration={fl?.duration}
                  flightType={fl?.flight_type}
                  amenities={fl?.amenities}
                  date={fl?.createdAt}
                  terminal={fl?.terminal}
                  gate={fl?.gate}
                />
              ))}
            <Pagination
              pageCount={data?.total}
              getPage={(page: number) =>
                setFilters((prev: any) => ({ ...prev, page }))
              }
            />
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl p-4 lg:hidden"
          >
            <div className="flex justify-end mb-4">
              <button aria-label="Close" onClick={() => setShowFilters(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <SearchFilters filters={filters} setFilters={setFilters} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FilterResults;
