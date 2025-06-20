"use client";
import { CheckCircle } from "lucide-react";
import CheckoutForm from "./components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";

const Checkout = () => {
  const id = useSearchParams().get("id");
  const { data } = useFetchData(`/hotel/${id}`, "hotelDetail");
  console.log("data", data);

  return (
    <div className="bg-white container md:py-16 py-6">
      <header className="bg-primary text-white p-4 rounded-lg flex items-center justify-between">
        <h1 className="heading-three">{data?.name}</h1>
        <p className="text-lg font-medium">Secure Checkout</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 mt-8 ">
        <div className="lg:w-2/3 bg-white shadow-md rounded-lg p-4">
          <h2 className="heading-four mb-6">Complete Your Booking</h2>

          <CheckoutForm hotelId={id ?? ""} hotelName={data?.name ?? ""} />
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h3 className="text-lg font-medium border-b pb-4 mb-4">
              Booking Summary
            </h3>

            <div className="mb-6">
              <h4 className="font-medium">Room Details</h4>
              {/* <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>Check-in: </p>
                <p>Check-out: </p>
                <p> nights, guests</p>
              </div> */}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Room Rate nights</span>
                <span>{data?.ratingsAverage}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>$15</span>
              </div> */}
              <div className="flex justify-between font-medium text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${data?.price}</span>
              </div>
            </div>

            <div className="mt-6 bg-green-50 p-3 rounded-md flex items-start">
              <CheckCircle className="text-secondary mt-0.5 mr-2 h-5 w-5" />
              <p className="text-sm text-secondary">
                Free cancellation until 24 hours before check-in. A valid credit
                card is required to secure your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
