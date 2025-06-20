"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListFilter, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { SearchFilters } from "@/app/(routes)/stays/components/SearchFilters";
import { useFetchData } from "@/hooks/useFetchData";
import HotelCard2 from "@/components/hotelCard/HotelCard2";
import { IStayType } from "@/types";
import Pagination from "@/components/pagination/Pagination";

const FilterResults = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [queryParams, setQueryParams] = useState("");

  const [filtersState, setFiltersState] = useState({
    stayType: [] as string[],
    featured: [] as string[],
    rating: [] as string[],
    minPrice: "",
    maxPrice: "",
    page: 1,
  });
console.log("filtersState",filtersState);
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const type = searchParams.get("stayType") || "";
  const roomType = searchParams.get("roomType") || "";

  useEffect(() => {
    if (type && !filtersState.stayType.includes(type)) {
      setFiltersState((prev) => ({
        ...prev,
        stayType: [type],
      }));
    }
  }, [type]);

  const { data, isPending, error, refetch } = useFetchData(
    `/hotel?${queryParams}`,
    "hotels"
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (roomType) params.set("roomType", roomType);

    const { stayType, featured, rating, minPrice, maxPrice, page } =
      filtersState;
    if (page > 1) params.set("page", page.toString());

    if (stayType.length) params.set("stayType", stayType.join(","));
    if (featured.length) params.set("featured", featured.join(","));
    if (rating.length) params.set("rating", rating.join(","));
    if (minPrice) params.set("minPrice", minPrice.toString());
    if (maxPrice) params.set("maxPrice", maxPrice.toString());

    setQueryParams(params.toString());
  }, [filtersState, city, checkIn, checkOut, roomType]);

  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };


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
            <SearchFilters
              {...filtersState}
              setStayType={(v) =>
                setFiltersState((p) => ({ ...p, stayType: v }))
              }
              setFeatured={(v) =>
                setFiltersState((p) => ({ ...p, featured: v }))
              }
              setRating={(v) => setFiltersState((p) => ({ ...p, rating: v }))}
              setMinPrice={(v) =>
                setFiltersState((p) => ({ ...p, minPrice: v }))
              }
              setMaxPrice={(v) =>
                setFiltersState((p) => ({ ...p, maxPrice: v }))
              }
              handleSubmit={handleSubmit}
              city={city}
            />
          </aside>

          <div className="space-y-6 lg:w-3/4 w-full">
            {isPending ? (
              <div className="animate-pulse">Loading...</div>
            ) : error ? (
              <div>Error loading data</div>
            ) : data?.data?.length > 0 ? (
              data?.data?.map((item : IStayType) => {
                console.log("item",item)
                return (
                  <HotelCard2
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    priceAfterDiscount={item.priceAfterDiscount}
                    ratingsAverage={item.ratingsAverage}
                    ratingsQuantity={item.ratingsQuantity}
                    city={item?.city?.name}
                    country={item?.country?.name}
                    images={item.images}
                    coverImage={item.coverImage}
                    availableRooms={item.availableRooms}
                    stayType={item.stayType}
                    type={item.type}
                  />
                )
              })
            ) : (
              <div>No hotels found matching your criteria</div>
            )}
            <Pagination
              pageCount={data?.total}
              getPage={(page) =>
                setFiltersState((p) => ({ ...p, page }))
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
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl p-4 md:hidden"
          >
            <div className="flex justify-end mb-4">
              <button aria-label="Close" onClick={() => setShowFilters(false)}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <SearchFilters
              {...filtersState}
              setStayType={(v) =>
                setFiltersState((p) => ({ ...p, stayType: v }))
              }
              setFeatured={(v) =>
                setFiltersState((p) => ({ ...p, featured: v }))
              }
              setRating={(v) => setFiltersState((p) => ({ ...p, rating: v }))}
              setMinPrice={(v) =>
                setFiltersState((p) => ({ ...p, minPrice: v }))
              }
              setMaxPrice={(v) =>
                setFiltersState((p) => ({ ...p, maxPrice: v }))
              }
              handleSubmit={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FilterResults;
