"use client";
import Hero from "./components/Hero";
import FilterResults from "./components/FilterResults";
import { useEffect, useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import page from "../success-payment/page";
export default function Page() {

 const [queryParams, setQueryParams] = useState("");

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    from : "",
    to : "",
    class_Type: "",
    stops: "",
    page: 1,
    minDuration: "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.from) params.set("from", filters.from);
    if (filters.to) params.set("to", filters.to);
    if(filters.stops) params.set("stops", filters.stops);
    if(filters.class_Type) params.set("class_Type", filters.class_Type);
    if(filters.minDuration) params.set("minDuration", filters.minDuration);
if (filters.page > 1) params.set("page", filters.page.toString());


    setQueryParams(params.toString());
  }, [filters]);
  console.log(filters);
  const { data, isPending, isError , refetch } = useFetchData(`/flight?${queryParams}`, "flights");
  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);
  return (
    <section>
      <Hero filters={filters} setFilters={setFilters }  />
      <FilterResults filters={filters} setFilters={setFilters} data={data} isPending={isPending} isError={isError} />
    </section>
  );
}
